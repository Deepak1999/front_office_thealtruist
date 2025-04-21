import React from 'react'

function CreateUsers() {





    const handleReset = () => {

    }

    return (
        <main id="main" className="main">
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create User</h5>
                                    <form className="row g-3">
                                        <div className="col-md-6">
                                            <label for="inputEmail5" className="form-label">User Name</label>
                                            <input type="email" className="form-control" id="inputEmail5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword5" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword5" className="form-label">Employee Name</label>
                                            <input type="password" className="form-control" id="inputPassword5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputState" className="form-label">Location</label>
                                            <select id="inputState" className="form-select">
                                                <option selected>Choose...</option>
                                                <option>...</option>
                                                <option>...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CreateUsers