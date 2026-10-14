import { jsPDF } from 'jspdf';
import { CV_DATA } from '../data/cvData.ts';

export function generateCvPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Helper for section headings
  const addSectionHeader = (title: string) => {
    checkPageBreak(12);
    y += 2;
    doc.setFillColor(27, 67, 50); // #1B4332
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 3, y + 4.2);
    y += 8;
  };

  // HEADER
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(27, 67, 50); // #1B4332
  doc.text(CV_DATA.fullName, margin, y + 2);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(64, 145, 108); // #40916C
  doc.text(CV_DATA.fullTitle, margin, y);
  y += 5;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 64, 67);
  const contactText = `Tel: ${CV_DATA.phone}  |  Email: ${CV_DATA.email}  |  Ubicación: ${CV_DATA.location}  |  ${CV_DATA.linkedInUser}`;
  doc.text(contactText, margin, y);
  y += 4.5;

  // Availability badge line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(139, 111, 71); // #8B6F47
  doc.text(CV_DATA.availability, margin, y);
  y += 5;

  // Decorative gold divider
  doc.setDrawColor(201, 168, 76); // #C9A84C
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  // 1. RESUMEN PROFESIONAL
  addSectionHeader('Resumen Profesional');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(45, 52, 54);
  const summaryLines = doc.splitTextToSize(CV_DATA.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.6 + 2;

  // 2. EXPERIENCIA PROFESIONAL
  addSectionHeader('Experiencia Profesional');
  CV_DATA.experiences.forEach((exp) => {
    checkPageBreak(30);
    // Role & Company
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(27, 67, 50);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(64, 145, 108);
    const periodText = `${exp.period}  |  ${exp.location}`;
    doc.text(periodText, pageWidth - margin - doc.getTextWidth(periodText), y);
    y += 4.2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(139, 111, 71);
    doc.text(`${exp.company} (${exp.sector})`, margin, y);
    y += 4;

    // Duties
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(50, 50, 50);
    exp.duties.forEach((duty) => {
      checkPageBreak(8);
      const lines = doc.splitTextToSize(`• ${duty}`, contentWidth - 4);
      doc.text(lines, margin + 2, y);
      y += lines.length * 3.3;
    });

    // Logros
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(27, 67, 50);
    doc.text('Logros:', margin + 2, y + 1);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    exp.achievements.forEach((ach) => {
      checkPageBreak(8);
      const lines = doc.splitTextToSize(`- ${ach}`, contentWidth - 6);
      doc.text(lines, margin + 4, y);
      y += lines.length * 3.2;
    });
    y += 3;
  });

  // 3. EDUCACIÓN
  addSectionHeader('Educación');
  CV_DATA.education.forEach((edu) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(27, 67, 50);
    doc.text(edu.degree, margin, y);

    const periodText = edu.period;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(64, 145, 108);
    doc.text(periodText, pageWidth - margin - doc.getTextWidth(periodText), y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);
    doc.text(`${edu.institution} | ${edu.location}`, margin, y);
    y += 5;
  });

  // 4. CURSOS Y CAPACITACIONES
  addSectionHeader('Cursos y Capacitaciones');
  CV_DATA.courses.forEach((c) => {
    checkPageBreak(9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(27, 67, 50);
    doc.text(`• ${c.title}`, margin + 1, y);

    const yearText = c.year;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 111, 71);
    doc.text(yearText, pageWidth - margin - doc.getTextWidth(yearText), y);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    doc.text(`${c.institution} - ${c.description}`, margin + 4, y);
    y += 4;
  });

  // 5. CONOCIMIENTOS TÉCNICOS & NORMATIVA
  addSectionHeader('Conocimientos Técnicos, Normativa & SSOMA');
  checkPageBreak(14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Normativa Ambiental y SST:', margin, y);
  y += 3.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  const normText = "Ley 29783 (SST) | D.S. 024-2016-EM y D.S. 023-2017-EM | ISO 14001:2015 | ISO 45001:2018 | ECA agua, ruido y suelo | LMP efluentes y emisiones | SEIA Ley 27446 | Ley 28611 (LGA) | Ley 27314 (LGRS) | SIGERSOL | Norma G.050 (Construcción)";
  const normLines = doc.splitTextToSize(normText, contentWidth);
  doc.text(normLines, margin, y);
  y += normLines.length * 3.3 + 1;

  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Herramientas SSOMA y Gestión Ambiental:', margin, y);
  y += 3.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  const toolsText = "Matriz IPERC | ATS | PETS | Plan de Emergencia | Inspecciones de Seguridad | Investigación de Incidentes | Control Documentario SSOMA (Anexo 5) | Monitoreo ambiental (efluentes PTARI, agua, ruido y suelo) | IGA (EIA, DIA, PAMA, PMA) | Cierre de minas y pasivos ambientales.";
  const toolsLines = doc.splitTextToSize(toolsText, contentWidth);
  doc.text(toolsLines, margin, y);
  y += toolsLines.length * 3.3 + 1;

  // 6. SOFTWARE, IDIOMAS Y REFERENCIAS
  addSectionHeader('Software, Idiomas & Referencias');
  checkPageBreak(18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Software:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text('MS Excel (Intermedio), MS Word (Intermedio), PowerPoint (Intermedio), Power BI (Básico), ArcGIS (Básico), QGIS (Básico), AutoCAD (Básico), Google Earth Pro (Básico), MS Project (Básico)', margin + 18, y);
  y += 4.5;

  checkPageBreak(10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Idiomas:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Español (Nativo) | Inglés: Nivel Intermedio (lectura técnica y normativas)', margin + 18, y);
  y += 4.5;

  checkPageBreak(10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Liderazgo:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Delegada y Presidenta de Salón (UNDAC 2020-2022) | Participación XV CONEIA (Arequipa 2022) | XVI CONEIA (Moyobamba 2023)', margin + 18, y);
  y += 4.5;

  checkPageBreak(10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(27, 67, 50);
  doc.text('Referencia:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text(`${CV_DATA.reference.name} - ${CV_DATA.reference.role} | Tel: ${CV_DATA.reference.phone}`, margin + 18, y);

  // Save the PDF
  doc.save('CV_Elsy_Melina_Malpartida_Carhuaz.pdf');
}

export function printCvClean(): void {
  // Create an isolated printable window or iframe with high-contrast print stylesheet
  const printWindow = window.open('', '_blank');
  const printContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>CV - Elsy Melina Malpartida Carhuaz</title>
  <style>
    @page {
      margin: 15mm;
      size: A4 portrait;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #2D3436;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 0;
      background: white;
    }
    h1 {
      font-size: 20pt;
      margin: 0 0 4px 0;
      color: #1B4332;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .subtitle {
      font-size: 11pt;
      font-weight: bold;
      color: #40916C;
      margin-bottom: 6px;
    }
    .contact-line {
      font-size: 9pt;
      color: #555;
      margin-bottom: 4px;
    }
    .avail-line {
      font-size: 9pt;
      font-weight: bold;
      color: #8B6F47;
      margin-bottom: 12px;
    }
    .divider {
      height: 2px;
      background: #C9A84C;
      margin-bottom: 14px;
    }
    .section-title {
      background: #1B4332;
      color: white;
      padding: 4px 8px;
      font-size: 10pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 14px;
      margin-bottom: 8px;
      border-radius: 2px;
    }
    p {
      margin: 0 0 6px 0;
      font-size: 9.5pt;
    }
    ul {
      margin: 4px 0 8px 18px;
      padding: 0;
      font-size: 9pt;
    }
    li {
      margin-bottom: 3px;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 10pt;
      color: #1B4332;
    }
    .job-sub {
      font-size: 9pt;
      font-weight: bold;
      color: #8B6F47;
      margin-bottom: 4px;
    }
    .achievements {
      background: #F4FBF7;
      border-left: 3px solid #40916C;
      padding: 6px 10px;
      margin: 6px 0;
      font-size: 8.5pt;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <h1>${CV_DATA.fullName}</h1>
  <div class="subtitle">${CV_DATA.fullTitle}</div>
  <div class="contact-line">Tel: ${CV_DATA.phone} | Email: ${CV_DATA.email} | Ubicación: ${CV_DATA.location} | ${CV_DATA.linkedInUser}</div>
  <div class="avail-line">${CV_DATA.availability}</div>
  <div class="divider"></div>

  <div class="section-title">Resumen Profesional</div>
  <p>${CV_DATA.summary}</p>

  <div class="section-title">Experiencia Profesional</div>
  ${CV_DATA.experiences
    .map(
      (exp) => `
    <div style="margin-bottom: 12px;">
      <div class="job-header">
        <span>${exp.role}</span>
        <span>${exp.period}</span>
      </div>
      <div class="job-sub">${exp.company} &mdash; ${exp.location} (${exp.sector})</div>
      <ul>
        ${exp.duties.map((d) => `<li>${d}</li>`).join('')}
      </ul>
      <div class="achievements">
        <strong>Logros:</strong> ${exp.achievements.join(' ')}
      </div>
    </div>
  `
    )
    .join('')}

  <div class="section-title">Educación</div>
  <div class="job-header">
    <span>${CV_DATA.education[0].degree}</span>
    <span>${CV_DATA.education[0].period}</span>
  </div>
  <div class="job-sub">${CV_DATA.education[0].institution} &mdash; ${CV_DATA.education[0].location}</div>

  <div class="section-title">Cursos y Capacitaciones</div>
  <ul>
    ${CV_DATA.courses.map((c) => `<li><strong>${c.title}</strong> (${c.year}) &mdash; ${c.institution}: ${c.description}</li>`).join('')}
  </ul>

  <div class="section-title">Normativa Ambiental &amp; SSOMA</div>
  <p style="font-size: 9pt;"><strong>Normativa:</strong> Ley 29783 (SST), D.S. 024-2016-EM / D.S. 023-2017-EM, ISO 14001:2015, ISO 45001:2018, ECA agua/ruido/suelo, LMP efluentes, SEIA Ley 27446, LGA 28611, LGRS 27314, SIGERSOL, Norma G.050.</p>
  <p style="font-size: 9pt;"><strong>Herramientas:</strong> Matriz IPERC, ATS, PETS, Plan de Emergencia, Inspecciones, Investigación de Incidentes, Control Documentario (Anexo 5), PTARI efluentes industriales, IGA (EIA, DIA, PAMA, PMA), Cierre de minas.</p>

  <div class="section-title">Software, Idiomas &amp; Referencias</div>
  <p style="font-size: 9pt;"><strong>Software:</strong> MS Excel (Intermedio), MS Word (Intermedio), PowerPoint (Intermedio), Power BI (Básico), ArcGIS (Básico), QGIS (Básico), AutoCAD (Básico), Google Earth Pro, MS Project.</p>
  <p style="font-size: 9pt;"><strong>Idiomas:</strong> Español (Nativo) | Inglés: Nivel Intermedio (lectura técnica).</p>
  <p style="font-size: 9pt;"><strong>Referencia Profesional:</strong> ${CV_DATA.reference.name} &mdash; ${CV_DATA.reference.role} (Tel: ${CV_DATA.reference.phone})</p>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
  `;

  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  } else {
    // If popup is blocked by iframe, use invisible print iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(printContent);
      doc.close();
      iframe.contentWindow?.focus();
      setTimeout(() => {
        try {
          iframe.contentWindow?.print();
        } catch {
          window.print();
        }
        setTimeout(() => document.body.removeChild(iframe), 2500);
      }, 500);
    } else {
      window.print();
    }
  }
}
