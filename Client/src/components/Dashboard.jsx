// import React, { useEffect, useState } from 'react';

// const Card = ({ title, children }) => {
//     return (
//         <div className="bg-white shadow-md rounded-2xl p-4">
//             <h2 className="text-sm text-gray-500">{title}</h2>
//             {children}
//         </div>
//     );
// };

// const Dashboard = () => {
//     const [walletBalance, setWalletBalance] = useState(0);
//     const [pickupPartners, setPickupPartners] = useState([]);
//     const [orders, setOrders] = useState({ total: 0, completed: 0, pending: 0 });

//     useEffect(() => {
//         // Fetch wallet balance, pickup partners, and orders from the backend
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         // Replace with actual API calls to fetch data
//         const walletResponse = await fetch('/api/wallet'); // Example endpoint
//         const walletData = await walletResponse.json();

//         const partnersResponse = await fetch('/api/pickup-partners'); // Example endpoint
//         const partnersData = await partnersResponse.json();

//         const ordersResponse = await fetch('/api/orders'); // Example endpoint
//         const ordersData = await ordersResponse.json();

//         setWalletBalance(walletData.balance);
//         setPickupPartners(partnersData);
//         setOrders(ordersData);
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <Card title="Total Wallet Balance">
//                     <p className="text-xl font-semibold text-gray-800">₹ {walletBalance}</p>
//                 </Card>

//                 <Card title="Pickup Partners">
//                     <ul>
//                         {pickupPartners.map(partner => (
//                             <li key={partner.id} className="text-gray-800">{partner.name} - {partner.status}</li>
//                         ))}
//                     </ul>
//                 </Card>

//                 <Card title="Orders Overview">
//                     <p className="text-xl font-semibold text-gray-800">Total: {orders.total}</p>
//                     <p className="text-sm text-gray-500">Completed: {orders.completed}</p>
//                     <p className="text-sm text-gray-500">Pending: {orders.pending}</p>
//                 </Card>
//             </div>

//             <div className="bg-white rounded-2xl shadow-md p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
//                 <p className="text-gray-500">More detailed components like charts, tables, or logs go here.</p>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;