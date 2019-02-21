import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CatalogServicesService {
    host: any;
    constructor(
        private http: HttpClient,
    ) { }

    getCustomers() {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        const url = 'http://localhost:5002/getCustomer';
        console.log("host ===========>" + this.host);
        console.log(' Provider API URL ......: ' + url + "    ,host==========>" + this.host);
        return this.http.get(url, { headers })
            .map((response: HttpResponse<any>) => {
                return response;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }


    getEnv() {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        const url = 'http://localhost:5002/getEnv';
        console.log("host ===========>" + this.host);
        console.log(' Provider API URL ......: ' + url + "    ,host==========>" + this.host);
        return this.http.get(url, { headers })
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }

    getUserinstanceDetails(custSelected, envSelected) {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        const url = 'http://localhost:5002/getUserinstanceDetails';
        var body = { "cust_id": custSelected, "env_id": envSelected };
        console.log("host ===========>" + this.host);
        console.log(' Provider API URL ......: ' + url + "    ,host==========>" + this.host);
        return this.http.post(url, body, { headers })
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                return Observable.throw(error);
            });
    }

    addCustomerDetails(customer, enviornment, username, apikey, urls) {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        // .append('Access-Control-Allow-Origin', 'http://127.0.0.1:5002')
        // .append('Access-Control-Allow-Credentials', 'true');

        const url = 'http://localhost:5002/saveCustomers';
        var body = { "customer": customer, "enviornment": enviornment, "username": username, "apikey": apikey, "urls": urls };
        console.log("host ===========>" + JSON.stringify(body));
        console.log(' Provider API URL ......: ' + url);
        return this.http.post(url, body)
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }

    getPrivateDtls() {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        // .append('Access-Control-Allow-Origin', 'http://127.0.0.1:5002')
        // .append('Access-Control-Allow-Credentials', 'true');

        const url = 'http://localhost:5002/getPrivateDetails';
        // var body = { "customer": customer, "enviornment": enviornment,"username":username,"apikey":apikey,"urls":urls };
        //console.log("host ===========>" + JSON.stringify(body));
        console.log(' Provider API URL ......: ' + url);
        return this.http.get(url)
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }


    getTradDtls() {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        // .append('Access-Control-Allow-Origin', 'http://127.0.0.1:5002')
        // .append('Access-Control-Allow-Credentials', 'true');

        const url = 'http://localhost:5002/getTradDetails';
        // var body = { "customer": customer, "enviornment": enviornment,"username":username,"apikey":apikey,"urls":urls };
        //console.log("host ===========>" + JSON.stringify(body));
        console.log(' Provider API URL ......: ' + url);
        return this.http.get(url)
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }



    getVraCatalogs() {
        const httpHeaders = new HttpHeaders();
        const headers = httpHeaders.append('Content-Type', 'application/json');
        // .append('Access-Control-Allow-Origin', 'http://127.0.0.1:5002')
        // .append('Access-Control-Allow-Credentials', 'true');

        const url = 'http://localhost:5002/getGitItems';
        // var body = { "customer": customer, "enviornment": enviornment,"username":username,"apikey":apikey,"urls":urls };
        //console.log("host ===========>" + JSON.stringify(body));
        console.log(' Provider API URL ......: ' + url);
        return this.http.get(url)
            .map((res: HttpResponse<any>) => {
                console.log('response is :' + JSON.stringify(res))
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                //this.log.info("HttpErrorResponse........:" + error.statusText);
                return Observable.throw(error);
            });
    }
}
