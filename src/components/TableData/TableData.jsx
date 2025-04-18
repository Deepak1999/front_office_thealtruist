import React, { useState, useMemo } from 'react';
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

const TableData = ({ uploadedData = [], arrivalsData = [], noShowData = [] }) => {

    const [activeTab, setActiveTab] = useState('uploaded');
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
            Cell: ({ value }) => {
                return <span>{formatDate(value)}</span>;
            }
        },
        { Header: 'View Documents', accessor: 'docPathh' },
        // { Header: 'Location Name', accessor: 'locationName' },
        { Header: 'Documents Type', accessor: 'docType' },
        { Header: 'Booking Upload Status', accessor: 'bookingUploadStatus' },
        {
            Header: 'Download',
            Cell: ({ row }) => (
                <button className="btn btn-sm btn-outline-success">
                    Download
                </button>
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

                {(activeTab === 'uploaded' && (Array.isArray(uploadedData) ? uploadedData.length === 0 : true)) && (
                    <div>No uploaded data found.</div>
                )}
                {(activeTab === 'arrivals' && (Array.isArray(arrivalsData) ? arrivalsData.length === 0 : true)) && (
                    <div>No arrivals data found.</div>
                )}
                {(activeTab === 'noshow' && (Array.isArray(noShowData) ? noShowData.length === 0 : true)) && (
                    <div>No Noshow data found.</div>
                )}

            </div>
        </div>
    );
};

export default TableData;
