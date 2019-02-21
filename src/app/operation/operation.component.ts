import { Component, OnInit, OnChanges } from '@angular/core';
import { CatalogServicesService } from '../services/catalog-services.service';
import {DashboardComponent} from '../dashboard/dashboard.component'

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  constructor(private catalogServices: CatalogServicesService,private dashboardComponent:DashboardComponent) { }
  Provider: any;
  category:any;
  icdCntainer:boolean;
  public providerSelected :String;
  pvtdiv:boolean;
  traddiv:boolean;
  public categorySelected:String;
  privateList:any;
  public privateDtls =[];
  tradList:any;
  tradDtls=[];
  vraCntainer:boolean;
  dropdownList = [];
  public optSelected:String;
  dropdownListMulti : any;
  selectedItems = [];
  dropdownSettings = {};
  vraList= [];
  dropdownList1 = [];
  icdTextAreaSection:boolean;
  textareaVal:String;
  ipSelected:String;
  envList = [];
  public pvtSelected:String;
  public tradSelected :String;
  processOperation : any;

 
  ngOnInit() {
    this.envList=this.dashboardComponent.Env;
    console.log("dashboard environment List ===>"+JSON.stringify(this.envList));
    console.log('Inside the operation')
    //this.Provider = [{provId:1,provName:'ICD'},{provId:2,provName:'VRA'}];
      this.Provider=["ICD","VRA"];
      this.category=["Private","Traditional"];
    
      this.selectedItems = [
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' }
      ];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  changeProvider(){
    console.log("Provider Selected is :" + this.providerSelected)
    if (this.providerSelected == "ICD"){
      this.dropdownList = [];
      this.icdCntainer=true;
      this.vraCntainer=false;
      this.icdTextAreaSection=false;
      this.dropdownList = ["Add","Delete","UploadICDConfig","updateICDProvider","deleteICDConfig"]

    }else{
      this.dropdownList = [];
      this.vraList = [];
      this.icdTextAreaSection=false;
      this.dropdownList = ["Add","Delete","UpdateService","UpdateConfig","UpdatePrice","DeletePrice"]
      this.icdCntainer=false;
      
      let dashcom = DashboardComponent;
      //dashcom.prototype.getEnviornmentdetails()  ; 

      this.dropdownListMulti = this.catalogServices.getVraCatalogs()
      .subscribe((response) => {
      // this.privateList = this.catalogServices.getPrivateDtls().subscribe((response) => {
        if (response) {
          console.log("Private list is :"+ response);
          this.dropdownListMulti = response;;
          if (this.dropdownListMulti!= undefined) {
           
            for (let i = 0; i < this.dropdownListMulti.length; i++) {
             // this.privateDtls=[];
              var item = this.dropdownListMulti[i];
              console.log("item is " + item);
              var dropdownItem = {
                item_id:i,
                item_text:item
              }
              this.vraList.push(dropdownItem)
              
              
            }
            console.log(JSON.stringify(this.vraList));
          }
          this.vraCntainer=true;
          console.log("List size is " + this.vraList.length)
          console.log("List  " + JSON.stringify(this.vraList))
          console.log("List  " + (this.vraList))
          for(var i=0;i<this.vraList.length;i++){
            console.log('item is :' + this.vraList[i]);
          }
          
         }
      },
        (error) => {
          
});


    }

  }

  changeCategory(){
    console.log("Cateory Select(ed is " + this.categorySelected)

    if(this.categorySelected == "Private"){
      this.pvtdiv = true;
      this.traddiv=false;
      this.privateDtls = [];
      this.privateDtls.push({"fname":"All","fvalue":"All"});

      this.privateList = this.catalogServices.getPrivateDtls()
      .subscribe((response) => {
      // this.privateList = this.catalogServices.getPrivateDtls().subscribe((response) => {
        if (response) {
          console.log("Private list is :"+ response);
          this.privateList = response;;
          if (this.privateList!= undefined) {
           
            for (let i = 0; i < this.privateList.length; i++) {
             // this.privateDtls=[];
              var item = this.privateList[i];
              
      var pvtItem = {"fname":item.fname,"fvalue":item.fvalue}
      console.log(pvtItem)
      //let privateDts=[];
      this.privateDtls.push(pvtItem);
      //console.log("List size is " + this.privateDtls.length)
              
            }
          }
          
          console.log("List size is " + this.privateDtls.length)
          
         }
      },
        (error) => {
          
});

    }else{
      this.pvtdiv = false;
      this.traddiv=true;
      this.tradDtls = [];
      this.tradDtls.push({"fname":"All","fvalue":"All"});
      this.tradList = this.catalogServices.getTradDtls()
      .subscribe((response) => {
      // this.privateList = this.catalogServices.getPrivateDtls().subscribe((response) => {
        if (response) {
          console.log("Private list is :"+ response);
          this.tradList = response;;
          if (this.tradList!= undefined) {
            for (let i = 0; i < this.tradList.length; i++) {
              var item = this.tradList[i];
              
      var tradItem = {"fname":item.fname,"fvalue":item.fvalue}
      console.log(tradItem)
      //let privateDts=[];
      this.tradDtls.push(tradItem);
      
              
            }
          }
          
          
         }
         console.log("List size is " + this.tradDtls.length)
      },
        (error) => {
          
});

      
    }
  }

  changeOperation(){
   
    this.icdTextAreaSection = false;
    console.log("Change the operation " + this.optSelected);
    if((this.optSelected !="Add" && this.optSelected!="Delete") && (this.providerSelected!="VRA")){
      this.icdTextAreaSection = true;
      var data =
      [
    {
         "id" : "ICBSYSCONFIG::BASEURL",
         "value" : "env_ip",
         "provisionValue" : "env_ip"
      },
    {
      "id": "userId_1",
      "provisionValue": "MXINTBRK_CCD1",
      "value": "MXINTBRK_CCD1"
    },
    {
      "id": "userId_2",
      "provisionValue": "MXINTBRK_CCD2",
      "value": "MXINTBRK_CCD2"
    },
    {
      "id": "Yes",
      "provisionValue": "1",
      "value": "Yes"
    },
    {
      "id": "No",
      "provisionValue": "0",
      "value": "No"
    }
  ]
  
  var provider = {
    "provider": "EVRYPrivateCloud"
  }

  var config = {"data" :"ICBSYSCONFIG::BASEURL,userId_1,userId_2,userId_3,userId_4,userId_5,userId_6,userId_7,userId_8,userId_9,userId_10,userId_11,userId_12,userId_13,userId_14,userId_15,Yes,No"
  }
      if(this.optSelected == "UploadICDConfig"){
        let raw_data  = JSON.stringify(data);
        console.log("IP selected is " + this.ipSelected);
        raw_data = raw_data.replace(/env_ip/g,this.ipSelected+'/');
        this.textareaVal = raw_data;
     
      }else if(this.optSelected == "updateICDProvider"){
        let raw_data  = JSON.stringify(provider);
        this.textareaVal = raw_data;
      }else{
        let raw_data  = JSON.stringify(config);
        this.textareaVal = raw_data;
      }
    }
    // else{
    //   this.icdTextAreaSection = false;
    // }
  }
  onSubmit(){
    console.log("Submitting the form")
    let provider = this.providerSelected;
    let ip = this.ipSelected;
    let category = this.categorySelected;
    let pvtSelecetd = this.pvtSelected;
    let tradSelected = this.tradSelected;

    this.processOperation = this.catalogServices.getPrivateDtls()
      .subscribe((response) => {
      // this.privateList = this.catalogServices.getPrivateDtls().subscribe((response) => {
        if (response) {
          console.log("Private list is :"+ response);
          this.privateList = response;;
          if (this.privateList!= undefined) {
           
            for (let i = 0; i < this.privateList.length; i++) {
             // this.privateDtls=[];
              var item = this.privateList[i];
              
      var pvtItem = {"fname":item.fname,"fvalue":item.fvalue}
      console.log(pvtItem)
      //let privateDts=[];
      this.privateDtls.push(pvtItem);
      //console.log("List size is " + this.privateDtls.length)
              
            }
          }
          
          console.log("List size is " + this.privateDtls.length)
          
         }
      },
        (error) => {
          
});

  }

}
