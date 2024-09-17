import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.endpoints.ms_user;
  user$: Observable<User | null>;
  private userSubject = new BehaviorSubject<User | null>(null);
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private applicantIdSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserByUid(user.uid);
        } else {
          return of(null);
        }
      })
    );

    this.user$.subscribe((user) => {
      if (user) {
        this.userSubject.next(user);
        this.userNameSubject.next(`${user.firstName} ${user.lastName}`);
      }
    });
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    phoneNumber: string
  ) {
    const userPayload = {
      firstName,
      lastName,
      email,
      password,
      role,
      phoneNumber,
    };

    await this.http.post(`${this.url}/register`, userPayload).toPromise();
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = await this.afAuth.currentUser;
      if (user) {
        const userDoc = await this.getUserByUid(user.uid).toPromise();

        if (userDoc) {
          switch (userDoc.role) {
            case 'admin':
              this.router.navigateByUrl('/admin/panel');
              break;
            case 'user':
              this.applicantIdSubject.next(userDoc.id);
              this.router.navigateByUrl('/user/panel');
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  getApplicantId(): Observable<string | null> {
    return this.applicantIdSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.user$.pipe(map((user) => (user ? user.role : null)));
  }

  getUserName(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;

      if (user) {
        this.http
          .get<User>(`${this.url}/uid/${user.uid}`)
          .subscribe((userDoc) => {
            if (!userDoc) {
              this.http
                .post(`${this.url}/register`, {
                  uid: user.uid,
                  email: user.email,
                  role: 'user',
                })
                .subscribe();
            }
            this.router.navigateByUrl('/user/panel');
          });
      }
    } catch (error) {
      console.error('Google sign-in failed', error);
    }
  }

  async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['/login']);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }

  private getUserByUid(uid: string): Observable<User | null> {
    return this.http.get<User>(`${this.url}/uid/${uid}`);
  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserByUid(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  async updateUserProfile(updatedUser: User): Promise<void> {
    await this.http
      .put(`${this.url}/update/${updatedUser.id}`, updatedUser)
      .toPromise();
    this.userSubject.next(updatedUser);
    this.userNameSubject.next(
      `${updatedUser.firstName} ${updatedUser.lastName}`
    );
  }
}
