import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor(
    public sanitizer: DomSanitizer,
  ) {}
  imgtourl(photo: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photo));
  }
}
