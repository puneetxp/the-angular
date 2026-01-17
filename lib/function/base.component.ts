// utils/base.component.ts
import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected isDestroyed = false;

  constructor(protected cdRef: ChangeDetectorRef) {}

  protected triggerChangeDetection(): void {
    if (!this.isDestroyed) {
      this.cdRef.detectChanges();
    }
  }

  protected safeDetectChanges(): void {
    if (!this.isDestroyed) {
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }
}
