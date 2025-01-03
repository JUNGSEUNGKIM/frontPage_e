import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (
    elementToPrintId: string,
    filename: string
) => {
    const element = document.getElementById(elementToPrintId);
    if (!element) {
        throw new Error(`Element with id ${elementToPrintId} not found`);
    }

    // HTML → Canvas 변환 (고해상도)
    const canvas = await html2canvas(element, { scale: 2 });

    // Canvas 데이터 URL
    const data = canvas.toDataURL("image/png");

    // PDF 설정 (화면 크기 동적 반영)
    const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
    });

    // 이미지 추가
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // 비율 유지
    pdf.addImage(data, "PNG", 0, 4, imgWidth, imgHeight);

    // PDF 저장
    pdf.save(`${filename}.pdf`);
};
