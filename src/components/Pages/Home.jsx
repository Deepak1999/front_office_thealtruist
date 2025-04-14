import React from 'react'

function Home() {

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">General Form Elements</h6>
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <select id="city" className="form-select">
                                                <option selected>Select City</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hotel" className="form-label">Hotel Name</label>
                                            <select id="hotel" className="form-select">
                                                <option selected>Select Hotel</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <select id="state" className="form-select">
                                                <option selected>Choose...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Buttons row */}
                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
