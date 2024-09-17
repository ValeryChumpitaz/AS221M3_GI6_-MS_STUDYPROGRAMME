export const environment = {
  production: false,
  endpoints: {
    ms_user: 'https://vg-ms-user-production.up.railway.app/api/users',
    ms_baptism: 'https://vg-ms-baptism-production.up.railway.app/api/baptism',
    ms_income_category: 'https://vg-ms-income-production.up.railway.app/api/income_category',
    ms_communion: 'http://localhost:8080/api/communions',
    ms_egress_category: 'https://vg-ms-egress-production.up.railway.app/api/egress_category',
    ms_confirmation: 'http://localhost:8080/api/confirmation',
    ms_egress: 'https://vg-ms-egress-production.up.railway.app/api/egress',
    ms_income: 'https://vg-ms-income-production.up.railway.app/api/income',
    ms_marriage: 'http://localhost:8080/api/marriages',
  },
  firebaseConfig: {
    apiKey: "AIzaSyBmdTkGmnd6srGvFYOLvtNJpOiHFAmVlOw",
    authDomain: "cetpro-db31e.firebaseapp.com",
    projectId: "cetpro-db31e",
    storageBucket: "cetpro-db31e.appspot.com",
    messagingSenderId: "660958261208",
    appId: "1:660958261208:web:762e75f03bfa7148e5ccad",
    measurementId: "G-4EV4MFLH5P"
  },
};
