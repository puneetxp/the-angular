import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from "@angular/core";

@Directive({
    selector: "[fileDragDrop]",
    standalone: true,
})
export class FileDragNDropDirective {
  //@Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  @Output()
  public filesChangeEmiter: EventEmitter<DragEvent> = new EventEmitter();
  //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding("style.background")
  public background = "#eee";
  @HostBinding("style.border")
  public borderStyle = "2px dashed";
  @HostBinding("style.border-color")
  public borderColor = "#696D7D";
  @HostBinding("style.border-radius")
  public borderRadius = "5px";

  constructor() {}

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "lightgray";
    this.borderColor = "#696D7D";
    this.borderStyle = "2px solid";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
    this.borderColor = "#696D7D";
    this.borderStyle = "2px dashed";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
    this.borderColor = "#696D7D";
    this.borderStyle = "2px dashed";
    if (evt.dataTransfer != null) {
      this.filesChangeEmiter.emit(evt);
    }
  }
}
