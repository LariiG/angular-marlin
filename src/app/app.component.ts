import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'meu-app-angular';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registrarIconesSociais();
  }

  private registrarIconesSociais(): void {
    const redesSociais = [
      'tiktok',
      'redex',
      'instagram',
      'facebook',
      'youtube',
      'linkedin',
    ];

    redesSociais.forEach((rede) => {
      this.iconRegistry.addSvgIcon(
        rede,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${rede}.svg`
        )
      );
    });
  }
}
