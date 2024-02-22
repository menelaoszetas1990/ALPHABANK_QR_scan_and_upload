import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class QrScannerComponent implements OnInit, OnDestroy {
  private html5QrCode: Html5Qrcode | undefined;
  // @ViewChild('qrReader', {static: true}) qrReaderElement!: ElementRef;
  @ViewChild('qrReader') qrReaderElement!: ElementRef;
  public scannedDocURL = '';

  constructor() { }

  ngOnInit(): void { }

  startScan() {
    this.html5QrCode = new Html5Qrcode(this.qrReaderElement.nativeElement.id);
    this.html5QrCode.start(
      { facingMode: "environment" }, // Use the rear camera
      {
        fps: 10,    // Optional frame per second, default is 2
        qrbox: 250  // Optional QR box size, default is to scan full video frame
      },
      (decodedText: string, decodedResult: any) => {
        // Handle the decoded text
        console.log(`Decoded text: ${decodedText}`, decodedResult);
        // Optionally, stop scanning once you get the desired result
        this.html5QrCode?.stop().then(() => console.log("QR Scanning stopped"));
        this.scannedDocURL = decodedText;
      },
      (errorMessage: string) => {
        // Parse error, ignore or log based on needs
        console.log(`QR scanning error: ${errorMessage}`);
      }
    ).catch((err: any) => {
      // Start failed, handle or log based on needs
      console.error("Unable to start QR scanning", err);
    });
  }

  stopScan() {
    // Ensure to cleanup and stop camera access on component destroy
    this.html5QrCode?.stop().then(() => {
      console.log('QR Scanning stopped');
    });
  }

  openDocument() {
    if (!this.scannedDocURL) return;
    const win = window.open(this.scannedDocURL, '_blank', 'directories=no, height=600px,left=0,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,top=0,width=800px');
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
