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

  // Collect link positions BEFORE converting to canvas (while layout is computed)
  const cloneRect = clone.getBoundingClientRect();
  const cloneScrollHeight = clone.scrollHeight;
  const linkEls = clone.querySelectorAll<HTMLAnchorElement>("a[data-pdf-link]");
  const linkAnnotations = Array.from(linkEls).map((el) => {
    const r = el.getBoundingClientRect();
    return {
      href: el.getAttribute("data-pdf-link") ?? el.href,
      x: r.left - cloneRect.left,
      y: r.top - cloneRect.top,
      w: r.width,
      h: r.height,
    };
  });

  let canvas;
  try {
    canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      height: cloneScrollHeight,
      windowWidth: 794,
    });
  } finally {
    document.body.removeChild(clone);
  }

  const imgData = canvas.toDataURL("image/png");
  const pxWidth = canvas.width;   // = 794 * 2
  const pxHeight = canvas.height; // = cloneScrollHeight * 2

  // Fit content to A4 width; let height scale naturally
  const pdfWidthMm = 210;
  const pdfHeightMm = (pxHeight / pxWidth) * pdfWidthMm;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidthMm, pdfHeightMm],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidthMm, pdfHeightMm);

  // Add clickable link annotations over the image
  // CSS pixels → mm: x scales by (210 / 794), y scales by (pdfHeightMm / cloneScrollHeight)
  const mmPerCssPxX = pdfWidthMm / 794;
  const mmPerCssPxY = pdfHeightMm / cloneScrollHeight;

  for (const { href, x, y, w, h } of linkAnnotations) {
    if (!href) continue;
    pdf.link(
      x * mmPerCssPxX,
      y * mmPerCssPxY,
      w * mmPerCssPxX,
      h * mmPerCssPxY,
      { url: href }
    );
  }

  const filename = name.trim().replace(/\s+/g, "_") + "_Resume.pdf";
  pdf.save(filename);
}
