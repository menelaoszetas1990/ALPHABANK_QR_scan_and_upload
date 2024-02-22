import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-upload.component.html',
  styleUrl: './pdf-upload.component.css'
})
export class PdfUploadComponent {
  public base64OfDocument = '';

  onFileSelected(event: any) {
    const fileInput = event.target; // Get the file input element
    const file: File = fileInput.files[0];

    if (file) {
      // Check if the file is a PDF
      if (file.type === "application/pdf") {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64 = e.target.result;
          // Now base64 contains the PDF file in Base64 format
          // You can use this string as per your requirement
          console.log(base64);
          this.base64OfDocument = base64;
        };

        reader.readAsDataURL(file);
      } else {
        // Handle the case where the file is not a PDF
        console.error("The file is not a PDF.");
        // You might want to alert the user or clear the input here
        fileInput.value = ""; // Clear the input
        this.base64OfDocument = "";
      }
    } else {
      // No file was selected
      fileInput.value = ""; // Clear the input
      this.base64OfDocument = "";
    }
  }
}
