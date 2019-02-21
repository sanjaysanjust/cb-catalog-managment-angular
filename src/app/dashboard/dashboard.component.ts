import { Component, OnInit } from '@angular/core';
import { CatalogServicesService } from '../services/catalog-services.service';
// import {OperationComponent} from '../operation/operation.component'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private catalogServices: CatalogServicesService) { }

    failTimeOut = 10000;
    error: boolean;
    public custId: Number;
    public custName: String;
    Customer = [];
    Env = [];
    public custSelected: Number;
    public envSelected: Number;
    customerDetails: any;
    envdetails: any;
    userinstanceDtls: any;
    public username: String;
    public apikey: String;
    public url: String;
    public addCustomer: boolean = false;
    public dashboard: boolean = true;
    public addcustomer: String;
    public addenviornment: String;
    public addusername: String;
    public addapikey: String;
    public addurl: String;
    public message: String;
    successResponse: boolean;
    operationNav: boolean;

    ngOnInit() {
        this.addCustomer = false;
        this.dashboard = true;
        this.getcustomerdetails();
        this.getEnviornmentdetails();
    }

    getcustomerdetails() {
        this.customerDetails = this.catalogServices.getCustomers()
            .subscribe((response) => {
                if (response) {
                    this.customerDetails = response;
                    if (this.customerDetails !== undefined) {
                        for (let i = 0; i < this.customerDetails.length; i++) {
                            var item = this.customerDetails[i];
                            var customerItem = { custId: item.customer_id, custName: item.customer_name }
                            console.log(customerItem)
                            this.Customer.push(customerItem);
                        }
                    }
                }
            },
                (error) => {

                });

    }

    getEnviornmentdetails() {
        console.log('Inside the dash component')
        this.envdetails = this.catalogServices.getEnv()
            .subscribe((response) => {
                if (response) {
                    this.envdetails = response;;
                    if (this.envdetails != undefined) {
                        for (let i = 0; i < this.envdetails.length; i++) {
                            var item = this.envdetails[i];
                            var envItem = { env_id: item.env_id, env_name: item.env_name }
                            console.log(envItem)
                            this.Env.push(envItem);
                        }
                    }
                }
            },
                (error) => {

                });
        return;
    }


    getUserinstanceDetails() {
        this.userinstanceDtls = this.catalogServices.getUserinstanceDetails(this.custSelected, this.envSelected)
            .subscribe((response) => {
                if (response) {
                    this.userinstanceDtls = response;
                    console.log(JSON.stringify(this.userinstanceDtls));
                    var dts = JSON.stringify(this.userinstanceDtls)
                    var data = JSON.parse(dts);
                    console.log(data);
                    this.username = data.user_name;
                    console.log(this.username)
                    this.apikey = data.api_key;
                    this.url = data.url;
                }
            },
                (error) => {
                });
    }

    addCustomers() {
        this.addCustomer = true;
        this.dashboard = false;

    }

    addCustomerDtls() {
        console.log(this.addcustomer);
        console.log(this.addenviornment);
        console.log(this.addusername);
        console.log(this.addapikey);
        console.log(this.addurl);
        //this.error = true;

        this.userinstanceDtls = this.catalogServices.addCustomerDetails(this.addcustomer, this.addenviornment, this.addusername, this.addapikey, this.addurl)
            .subscribe((response) => {
                if (response) {

                    this.userinstanceDtls = response;
                    console.log(JSON.stringify(this.userinstanceDtls));
                    var dts = JSON.stringify(this.userinstanceDtls)
                    var data = JSON.parse(dts);
                    console.log(data);
                    var status = data.status;
                    this.message = data.message;
                    console.log('status***', status + 'message', this.message)
                    if (status == 'Success') {

                        this.addCustomer = false;
                        this.dashboard = true;
                        this.successResponse = true;
                        console.log('successResponse', this.successResponse);
                        setTimeout(() => {
                            this.error = false;
                            this.successResponse = false;
                        }, this.failTimeOut);
                    } else {

                        this.addCustomer = true;
                        this.dashboard = false;
                        this.error = true;
                        this.successResponse = false;
                        setTimeout(() => {
                            this.error = false;
                            this.successResponse = false;
                        }, this.failTimeOut);

                    }




                }
            },
                (error) => {

                });

    }

    navigateToOperation() {
        alert('Inside');
        this.operationNav = true;
        this.dashboard = false;
        // this.operation.ngOnInit()
    }



}
