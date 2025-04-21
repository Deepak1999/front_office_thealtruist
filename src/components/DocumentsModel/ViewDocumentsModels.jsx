// import React, { useEffect, useState } from 'react';

// const ViewDocumentsModels = () => {
//     const [documents, setDocuments] = useState([]);
//     const bookingId = '41321863'; // You can make this dynamic if needed

//     const fetchDocuments = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const source = localStorage.getItem('source');
//             const adminUserId = localStorage.getItem('id');

//             if (!token || !source || !adminUserId) {
//                 console.error('Missing headers in localStorage');
//                 return;
//             }

//             const response = await fetch('https://liveapi-booking.liveabuzz.com/hotel/logix/v1/find/cust/booking/details', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': token,
//                     'Source': source,
//                     'adminuserid': adminUserId
//                 },
//                 body: JSON.stringify({ bookingId })
//             });

//             if (!response.ok) throw new Error('Failed to fetch documents');

//             const data = await response.json();

//             if (data?.altruistUserContacts) {
//                 setDocuments(data.altruistUserContacts);
//             } else {
//                 console.warn('No user documents found');
//             }
//         } catch (error) {
//             console.error('Error fetching documents:', error);
//         }
//     };

//     useEffect(() => {
//         fetchDocuments();
//     }, []);

//     const renderImageCard = (imageUrl, label, key) => (
//         <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={key}>
//             <div className="card h-100">
//                 <div
//                     className="image-wrapper"
//                     style={{
//                         width: '100%',
//                         height: '200px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         overflow: 'hidden',
//                         backgroundColor: '#f8f9fa'
//                     }}
//                 >
//                     <img
//                         src={imageUrl}
//                         alt={label}
//                         style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
//                     />
//                 </div>
//                 <div className="card-body">
//                     <h6 className="card-title text-center">{label}</h6>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <main id="main" className="main">
//             <section className="section">
//                 <div className="container">
//                     <div className="row">
//                         {documents.flatMap((doc, index) => ([
//                             renderImageCard(doc.docPath, `Aadhar Card Front `, `${index}-docPath`),
//                             renderImageCard(doc.docPath2, `Aadhar Card BAck `, `${index}-docPath2`),
//                             renderImageCard(doc.regImagePath, `Registration `, `${index}-regImagePath`)
//                         ]))}
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// };

// export default ViewDocumentsModels;
