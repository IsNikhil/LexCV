export async function downloadResumeAsPdf(name: string = "Resume"): Promise<void> {
  const element = document.getElementById("resume-preview");
  if (!element) throw new Error("Resume preview element not found");

  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  // Clone outside all overflow:hidden containers so html2canvas captures it fully
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.top = "0";
  clone.style.left = "-9999px";
  clone.style.zIndex = "-1";
  clone.style.width = "794px";
  clone.style.minHeight = "auto";
  document.body.appendChild(clone);

  let canvas;
  try {
    canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      height: clone.scrollHeight,
      windowWidth: 794,
    });
  } finally {
    document.body.removeChild(clone);
  }

  const imgData = canvas.toDataURL("image/png");
  const pxWidth = canvas.width;
  const pxHeight = canvas.height;

  // Fit content to A4 width; let height scale naturally (no slicing = no corrupt PNG)
  const pdfWidthMm = 210;
  const pdfHeightMm = (pxHeight / pxWidth) * pdfWidthMm;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidthMm, pdfHeightMm],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidthMm, pdfHeightMm);

  const filename = name.trim().replace(/\s+/g, "_") + "_Resume.pdf";
  pdf.save(filename);
}
