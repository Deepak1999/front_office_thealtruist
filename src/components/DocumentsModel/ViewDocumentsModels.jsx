import React from 'react'

const ViewDocumentsModels = () => {
    return (
        <main id="main" class="main">
            <section class="section">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Scrolling long content</h5>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalDialogScrollable">
                                    Modal Dialog Scrollable
                                </button>
                                <div class="modal fade" id="modalDialogScrollable" tabindex="-1">
                                    <div class="modal-dialog modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Modal Dialog Scrollable</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit.
                                                Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur
                                                nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.
                                                <br /><br />
                                                This content should appear at the bottom after you scroll.
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ViewDocumentsModels