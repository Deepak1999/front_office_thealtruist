import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CustomCss/spinner.css';

function UploadArrivals() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwtToken = localStorage.getItem('token');
        const adminUserId = localStorage.getItem('id');
        const source = localStorage.getItem('source');

        if (!file) {
            toast.warning('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);
        formData.append('jwtToken', jwtToken);
        formData.append('adminUserId', adminUserId);
        formData.append('source', source);

        try {
            setLoading(true);
            const response = await fetch('http://192.168.167.102:5556/v3/save/TheAltruist/Guest/Details', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setLoading(false);

            const { statusCode, statusMessage } = data?.statusDescription || {};

            if (statusCode === 200) {
                toast.success(statusMessage || 'Upload successful!');
            } else if (statusCode === 710) {
                toast.warning(statusMessage || 'Duplicate entries found.');
            } else {
                toast.error(statusMessage || 'Something went wrong.');
            }

            const newData = (data.altruistPosExcelDatas || []).map(d => ({ ...d, type: 'New' }));
            const existingData = (data.existingEntries || []).map(d => ({ ...d, type: 'Existing' }));
            setUploadData([...newData, ...existingData]);

        } catch (error) {
            setLoading(false);
            toast.error('Failed to upload file. Please try again.');
        }
    };

    const handleReset = () => {
        setFile(null);
        setUploadData([]);
        document.getElementById('formFile').value = null;
    };

    const columns = React.useMemo(
        () => [
            { Header: '#', accessor: (_, rowIndex) => rowIndex + 1 },
            { Header: 'Guest Name', accessor: 'guestName' },
            { Header: 'Group Number', accessor: 'resGroupNumber' },
            { Header: 'Room Type', accessor: 'roomType' },
            { Header: 'Check-In', accessor: 'checkInDate' },
            { Header: 'Check-Out', accessor: 'checkOutDate' },
            // { Header: 'PAX', accessor: 'pax' },
            { Header: 'Status', accessor: 'status' },
            { Header: 'Hotel Name', accessor: 'hotelName' },
            { Header: 'Type', accessor: 'type' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: uploadData,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    );

    return (
        <main id="main" className="main">
            <ToastContainer />
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Upload Arrivals</h5>

                                {loading && (
                                    <div className="text-center my-3">
                                        <div className="spinner"></div>
                                        <p>Uploading...</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="formFile" className="col-sm-2 col-form-label">File Upload</label>
                                        <div className="col-sm-10">
                                            <input
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3" disabled={loading}>
                                                Submit
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {uploadData.length > 0 && (
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">Uploaded Details</h5>
                                    <table className="table table-striped" {...getTableProps()}>
                                        <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map(column => (
                                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {page.map(row => {
                                                prepareRow(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map(cell => (
                                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        ))}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
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
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default UploadArrivals;
