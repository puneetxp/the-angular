import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
    selector: 'the-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [ RouterLink]
})
export class FooterComponent { }
