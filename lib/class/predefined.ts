import { HttpHeaders } from "@angular/common/http";

export class predefined {
 static set_session(i : HttpHeaders) {
    localStorage.setItem("session_id", i.get("x-session-id") ?? "");
 }
 static get_session(){
  return localStorage.getItem('session_id');
 }
 static get_session_get(){
  return (localStorage.getItem("session_id") ? '?session_id='+localStorage.getItem("session_id") : '');
 }
 static EXTRA_SMALL_WIDTH_BREAKPOINT = 600;
 public static seoform = [{
  key: `title`, value:'', label: `Title`, controlType: 'textbox', row: "col-span-full", class: 'w-full'
 }, {
  key: `seo_description`, label: `SEO Description`, controlType: 'textarea', row: "col-span-full", class: 'w-full'
 }
 ]
 public static _name = {
  key: `name`, label: `Name`, value:'', controlType: 'textbox', row: "col-span-2", class: 'w-full'
 }
 public static slug = {
  key: `slug`, label: `Slug`,  value:'',controlType: 'textbox', row: "col-span-2", class: 'w-full'
 }
 public static phone = {
  key: `phone`, label: `Phone`, controlType: 'textbox', row: "col-span-2", class: 'w-full'
 }
 public static email = {
  key: `email`, label: `Email`, controlType: 'textbox', row: "col-span-2", class: 'w-full'
 }
 public static description = {
  key: `description`, value:'', label: `Description`, controlType: 'textarea', row: "col-span-full", class: 'w-full'
 }
 public static enable = (value: boolean = true) => ({
  key: `enable`, label: `Enable`, value: true, controlType: 'toggle', class: 'm-2', other: {
   slider: value ? 1 : 0
  }
 });
 public static user = {
  key: `user_id`, label: `User`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
 public static client = {
  key: `client_id`, label: `Client`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
 public static executive = {
  key: `executive_id`, label: `Executive`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
 public static gstn = {
  key: `gstn_id`, label: `Gst Number`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete', optionsObservable: { key: "id", value: "number" }
 };
 public static service = {
  key: `service_id`, label: `Service`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
 public static service_plan = {
  key: `service_plan_id`, label: `Service Plan`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
 public static service_plan_price = {
  key: `service_plan_price_id`, label: `Service Plan Price`, row: 'col-span-2', class: 'w-full', controlType: '$dropdownautocomplete'
 };
}
