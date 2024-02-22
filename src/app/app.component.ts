import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QrScannerComponent, PdfUploadComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'camera-scan-test';
}
