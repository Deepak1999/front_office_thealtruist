// import React, { useState, useMemo } from 'react';
// import { useTable, usePagination } from 'react-table';

// const CustomReactTable = ({ columns, data, title }) => {
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         page,
//         pageOptions,
//         nextPage,
//         previousPage,
//         canNextPage,
//         canPreviousPage,
//         state: { pageIndex },
//     } = useTable(
//         {
//             columns,
//             data,
//             initialState: { pageIndex: 0, pageSize: 5 },
//         },
//         usePagination
//     );

//     return (
//         <div className="card mt-4">
//             <div className="card-body">
//                 <h5 className="card-title">{title}</h5>
//                 <table className="table table-striped" {...getTableProps()}>
//                     <thead>
//                         {headerGroups.map(headerGroup => (
//                             <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                                 {headerGroup.headers.map(column => (
//                                     <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody {...getTableBodyProps()}>
//                         {page.map((row, i) => {
//                             prepareRow(row);
//                             return (
//                                 <tr {...row.getRowProps()} key={i}>
//                                     {row.cells.map(cell => (
//                                         <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
//                                     ))}
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>

//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                     <button className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
//                         Previous
//                     </button>
//                     <span>Page {pageIndex + 1} of {pageOptions.length}</span>
//                     <button className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// function formatDate(dateString) {
//     const date = new Date(dateString);

//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
// }

// const TableData = ({ uploadedData = [], arrivalsData = [], noShowData = [] }) => {

//     const [activeTab, setActiveTab] = useState('uploaded');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const uploadedColumns = useMemo(() => [
//         { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
//         { Header: 'Booking ID', accessor: 'bookingId' },
//         { Header: 'Total Guest Count', accessor: 'occupancyType' },
//         { Header: 'Uploaded Guest Count', accessor: 'uploadedGuestCount' },
//         {
//             Header: 'Upload Date',
//             accessor: 'uploadDate',
//             Cell: ({ value }) => {
//                 return <span>{formatDate(value)}</span>;
//             }
//         },
//         // { Header: 'View Documents', accessor: 'docPath' },
//         {
//             Header: 'View Documents',
//             Cell: ({ row }) => (
//                 <button
//                     className="btn btn-sm btn-outline-primary"
//                 // onClick={() => openViewDocumentsModal(row.original)} // replace with your handler
//                 >
//                     <i className="fa-solid fa-eye"></i>
//                 </button>
//             )
//         },
//         { Header: 'Documents Type', accessor: 'docType' },
//         { Header: 'Booking Upload Status', accessor: 'bookingUploadStatus' },
//         {
//             Header: 'Download',
//             Cell: ({ row }) => (
//                 <button className="btn btn-sm btn-outline-success">
//                     Download
//                 </button>
//             )
//         }
//     ], []);

//     const arrivalsColumns = useMemo(() => [
//         { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
//         { Header: 'Booking ID', accessor: 'resGroupNumber' },
//         { Header: 'Check-In Date', accessor: 'checkInDate' },
//         { Header: 'Check-Out Date', accessor: 'checkOutDate' },
//         { Header: 'Guest Name', accessor: 'guestName' },
//         // { Header: 'Date Time', accessor: 'dateTime' },
//         {
//             Header: 'Date Time',
//             accessor: 'dateTime',
//             Cell: ({ value }) => {
//                 return <span>{formatDate(value)}</span>;
//             }
//         },
//     ], []);

//     const noShowColumns = useMemo(() => [
//         { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
//         { Header: 'User ID', accessor: 'userId' },
//         { Header: 'Booking ID', accessor: 'bookingId' },
//         { Header: 'Upload Date', accessor: 'uploadDate' },
//         { Header: 'Location Name', accessor: 'location' },
//     ], []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <h5 className="card-title">Booking Tables</h5>

//                 <ul className="nav nav-tabs nav-tabs-bordered mb-3">
//                     <li className="nav-item">
//                         <button
//                             className={`nav-link ${activeTab === 'uploaded' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('uploaded')}
//                         >
//                             Uploaded Booking IDS
//                         </button>
//                     </li>
//                     <li className="nav-item">
//                         <button
//                             className={`nav-link ${activeTab === 'arrivals' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('arrivals')}
//                         >
//                             Arrivals Booking IDS
//                         </button>
//                     </li>
//                     <li className="nav-item">
//                         <button
//                             className={`nav-link ${activeTab === 'noshow' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('noshow')}
//                         >
//                             No Show Booking IDS
//                         </button>
//                     </li>
//                 </ul>

//                 {activeTab === 'uploaded' && Array.isArray(uploadedData) && uploadedData.length > 0 && (
//                     <CustomReactTable columns={uploadedColumns} data={uploadedData} title="Uploaded Booking IDS Details" />
//                 )}

//                 {activeTab === 'arrivals' && Array.isArray(arrivalsData) && arrivalsData.length > 0 && (
//                     <CustomReactTable columns={arrivalsColumns} data={arrivalsData} title="Arrivals Booking IDS Details" />
//                 )}

//                 {activeTab === 'noshow' && Array.isArray(noShowData) && noShowData.length > 0 && (
//                     <CustomReactTable columns={noShowColumns} data={noShowData} title="No Show Booking IDS Details" />
//                 )}

//                 {(activeTab === 'uploaded' && (Array.isArray(uploadedData) ? uploadedData.length === 0 : true)) && (
//                     <div>No uploaded data found.</div>
//                 )}
//                 {(activeTab === 'arrivals' && (Array.isArray(arrivalsData) ? arrivalsData.length === 0 : true)) && (
//                     <div>No arrivals data found.</div>
//                 )}
//                 {(activeTab === 'noshow' && (Array.isArray(noShowData) ? noShowData.length === 0 : true)) && (
//                     <div>No Noshow data found.</div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default TableData;


import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';

const CustomReactTable = ({ columns, data, title }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    );

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <table className="table table-striped" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={i}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>
                    <span>Page {pageIndex + 1} of {pageOptions.length}</span>
                    <button className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


const ViewDocumentsModal = ({ bookingId, showModal, handleClose }) => {
    const [documents, setDocuments] = useState([]);


    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem('token');
            const source = localStorage.getItem('source');
            const adminUserId = localStorage.getItem('id');

            if (!token || !source || !adminUserId) {
                console.error('Missing headers in localStorage');
                return;
            }

            const response = await fetch('https://liveapi-booking.liveabuzz.com/hotel/logix/v1/find/cust/booking/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                    'Source': source,
                    'adminuserid': adminUserId
                },
                body: JSON.stringify({ bookingId })
            });

            if (!response.ok) throw new Error('Failed to fetch documents');

            const data = await response.json();

            if (data?.altruistUserContacts) {
                setDocuments(data.altruistUserContacts);
            } else {
                console.warn('No user documents found');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        if (showModal) {
            fetchDocuments();
        }
    }, [showModal]);

    const renderImageCard = (imageUrl, label, key) => (
        <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={key}>
            <div className="card h-100">
                <div
                    className="image-wrapper"
                    style={{
                        width: '100%',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        backgroundColor: '#f8f9fa'
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={label}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                </div>
                <div className="card-body">
                    <h6 className="card-title text-center">{label}</h6>
                </div>
            </div>
        </div>
    );

    if (!showModal) return null;

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Documents for Booking ID: {bookingId}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {documents.flatMap((doc, index) => ([
                                renderImageCard(doc.docPath, `Aadhar Card Front`, `${index}-docPath`),
                                renderImageCard(doc.docPath2, `Aadhar Card Back`, `${index}-docPath2`),
                                renderImageCard(doc.regImagePath, `Registration Image`, `${index}-regImagePath`)
                            ]))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TableData = ({ uploadedData = [], arrivalsData = [], noShowData = [] }) => {

    const [activeTab, setActiveTab] = useState('uploaded');
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const uploadedColumns = useMemo(() => [
        { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
        { Header: 'Booking ID', accessor: 'bookingId' },
        { Header: 'Total Guest Count', accessor: 'occupancyType' },
        { Header: 'Uploaded Guest Count', accessor: 'uploadedGuestCount' },
        {
            Header: 'Upload Date',
            accessor: 'uploadDate',
            Cell: ({ value }) => <span>{formatDate(value)}</span>
        },
        {
            Header: 'View Documents',
            Cell: ({ row }) => (
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openViewDocumentsModal(row.original.bookingId)}
                >
                    <i className="fa-solid fa-eye"></i>
                </button>
            )
        },
        { Header: 'Documents Type', accessor: 'docType' },
        { Header: 'Booking Upload Status', accessor: 'bookingUploadStatus' },
        {
            Header: 'Download',
            Cell: ({ row }) => (
                <button className="btn btn-sm btn-outline-success">Download</button>
            )
        }
    ], []);

    const arrivalsColumns = useMemo(() => [
        { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
        { Header: 'Booking ID', accessor: 'resGroupNumber' },
        { Header: 'Check-In Date', accessor: 'checkInDate' },
        { Header: 'Check-Out Date', accessor: 'checkOutDate' },
        { Header: 'Guest Name', accessor: 'guestName' },
        // { Header: 'Date Time', accessor: 'dateTime' },
        {
            Header: 'Date Time',
            accessor: 'dateTime',
            Cell: ({ value }) => {
                return <span>{formatDate(value)}</span>;
            }
        },
    ], []);

    const noShowColumns = useMemo(() => [
        { Header: 'Sr. No', accessor: (_row, i) => i + 1 },
        { Header: 'User ID', accessor: 'userId' },
        { Header: 'Booking ID', accessor: 'bookingId' },
        { Header: 'Upload Date', accessor: 'uploadDate' },
        { Header: 'Location Name', accessor: 'location' },
    ], []);

    const openViewDocumentsModal = (bookingId) => {
        setSelectedBookingId(bookingId); // Set the selected booking ID
        setShowModal(true); // Show the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSelectedBookingId(null); // Reset selected booking ID
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Booking Tables</h5>

                <ul className="nav nav-tabs nav-tabs-bordered mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'uploaded' ? 'active' : ''}`}
                            onClick={() => setActiveTab('uploaded')}
                        >
                            Uploaded Booking IDS
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'arrivals' ? 'active' : ''}`}
                            onClick={() => setActiveTab('arrivals')}
                        >
                            Arrivals Booking IDS
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'noshow' ? 'active' : ''}`}
                            onClick={() => setActiveTab('noshow')}
                        >
                            No Show Booking IDS
                        </button>
                    </li>
                </ul>

                {activeTab === 'uploaded' && Array.isArray(uploadedData) && uploadedData.length > 0 && (
                    <CustomReactTable columns={uploadedColumns} data={uploadedData} title="Uploaded Booking IDS Details" />
                )}

                {activeTab === 'arrivals' && Array.isArray(arrivalsData) && arrivalsData.length > 0 && (
                    <CustomReactTable columns={arrivalsColumns} data={arrivalsData} title="Arrivals Booking IDS Details" />
                )}

                {activeTab === 'noshow' && Array.isArray(noShowData) && noShowData.length > 0 && (
                    <CustomReactTable columns={noShowColumns} data={noShowData} title="No Show Booking IDS Details" />
                )}

                {showModal && (
                    <ViewDocumentsModal
                        bookingId={selectedBookingId}
                        showModal={showModal}
                        handleClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default TableData;
