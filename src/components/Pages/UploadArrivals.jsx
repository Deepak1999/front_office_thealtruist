import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CustomCss/spinner.css';

function UploadArrivals() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

            const response = await fetch('https://liveapi-booking.liveabuzz.com/v3/save/TheAltruist/Guest/Details', {
                method: 'POST',
                body: formData
            });

            setLoading(false);

            const data = await response.json();

            const { statusCode, statusMessage } = data?.statusDescription || {};

            if (statusCode === 200) {
                toast.success(statusMessage || 'File uploaded successfully!');
            } else {
                toast.error(statusMessage || 'Something went wrong.');
            }

            console.log('Response:', data);
        } catch (error) {
            setLoading(false);
            toast.error('Failed to upload file. Please try again.');
        }
    };


    const handleReset = () => {
        setFile(null);
        document.getElementById('formFile').value = null;
    };

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
                    </div>
                </div>
            </section>
        </main>
    );
}

export default UploadArrivals;
