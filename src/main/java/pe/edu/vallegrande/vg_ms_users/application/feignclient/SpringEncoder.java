package pe.edu.vallegrande.vg_ms_users.application.feignclient;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;

public class SpringEncoder {
    public SpringEncoder(ObjectFactory<HttpMessageConverters> objectFactory) {
    }
}
