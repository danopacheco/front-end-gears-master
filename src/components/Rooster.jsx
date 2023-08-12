import React, { useState, useEffect } from 'react';
import DaySchedule from './DaySchedule';
import '../css/Rooster.css';
import jsPDF from 'jspdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RoosterPDF from './RoosterPDF';
import { FaFileDownload } from 'react-icons/fa';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Rooster = () => {
    const [schedules, setSchedules] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedMechanic, setSelectedMechanic] = useState(null);

    const handleTimeChange = (day, field, time) => {
        setSchedules(prevSchedules => ({
            ...prevSchedules,
            [day]: {
                ...prevSchedules[day],
                [field]: time
            }
        }));
    };

    const [mechanics, setMechanicData] = useState([]);

    useEffect(() => {
      // Replace this with your API endpoint
      fetch('http://localhost:4000/getMechanics')
        .then(response => response.json())
        .then(data => setMechanicData(data))
        .catch(error => console.error('Error fetching mechanic data:', error));
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectMechanic = mechanic => {
        setSelectedMechanic(mechanic);
        setIsDropdownOpen(false);
    };

    // const handleSaveChanges = () => {
    //     // Generar el contenido del PDF
    //     const doc = new jsPDF();

    //     // Agregar el título
    //     doc.setFontSize(24);
    //     doc.text('Weekly Schedule', 10, 10);

    //     // Generar el contenido utilizando RoosterPDF
    //     const pdfContent = (
    //         <RoosterPDF schedules={schedules} selectedMechanic={selectedMechanic} />
    //     );

    //     // Renderizar el contenido en el PDF
    //     doc.setFontSize(12);
    //     doc.fromHTML(pdfContent, 10, 20);

    //     // Mostrar un diálogo para elegir guardar o imprimir el PDF
    //     const choice = window.confirm('Do you want to download or print the PDF?');
    //     if (choice) {
    //         // Descargar el PDF
    //         doc.save('weekly_schedule.pdf');
    //     } else {
    //         // Imprimir el PDF
    //         doc.autoPrint();
    //         window.open(doc.output('bloburl'), '_blank');
    //         const pdfUrl = doc.output('bloburl');
    //         const newWindow = window.open(pdfUrl, '_blank');
    //         if (!newWindow) {
    //             alert('Please allow pop-ups to print the PDF.');
    //         }
    //     }
    // };


    return (
        <div className="rooster-container">
            <h2>Weekly Schedule</h2>
            <div className="mechanics-dropdown">
                <button className="mechanics-button" onClick={toggleDropdown}>
                    {selectedMechanic || 'Select Mechanic'}
                </button>
                {isDropdownOpen && (
                    <ul className="mechanics-list">
                        {mechanics.map(mechanic => (
                            <li key={mechanic} onClick={() => selectMechanic(mechanic.name)}>
                                {mechanic.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="day-schedules">
                {daysOfWeek.map(day => (
                    <DaySchedule
                        key={day}
                        day={day}
                        schedule={schedules[day] || {}}
                        onTimeChange={handleTimeChange}
                    />
                ))}
            </div>
                <PDFDownloadLink
                 className="save-changes-button mb-5"
                    document={<RoosterPDF schedules={schedules} selectedMechanic={selectedMechanic} />}
                    fileName="weekly_schedule.pdf"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <FaFileDownload />
                    }
                </PDFDownloadLink>
        </div>
    );
};

export default Rooster;
