import React from 'react'
import { Input, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, CustomInput } from "reactstrap";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

 const ExportCSV = ({ csvData, fileName }) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <div className='export-btn-outer'>
        <Button variant="warning" className="export-btn" onClick={(e) => exportToCSV(csvData, fileName)}>Export</Button>
        </div>
    )
}

export default ExportCSV;