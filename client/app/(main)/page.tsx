/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import { Skeleton } from 'primereact/skeleton';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [loading, setLoading] = useState(true);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'IDR'
        });
    };

    const renderSkeleton = () => {
        return (
            <>
                <Skeleton width="100%" height="2rem" className="mb-2" />
                <Skeleton width="100%" height="2rem" className="mb-2" />
                <Skeleton width="100%" height="2rem" className="mb-2" />
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    {loading ? renderSkeleton() : (
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Orders</span>
                                <div className="text-900 font-medium text-xl">152</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <>
                            <span className="text-green-500 font-medium">24 new </span>
                            <span className="text-500">since last visit</span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    {loading ? renderSkeleton() : (
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Revenue</span>
                                <div className="text-900 font-medium text-xl">$2.100</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-map-marker text-orange-500 text-xl" />
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <>
                            <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    {loading ? renderSkeleton() : (
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Customers</span>
                                <div className="text-900 font-medium text-xl">28441</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-inbox text-cyan-500 text-xl" />
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <>
                            <span className="text-green-500 font-medium">520 </span>
                            <span className="text-500">newly registered</span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    {loading ? renderSkeleton() : (
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Comments</span>
                                <div className="text-900 font-medium text-xl">152 Unread</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-comment text-purple-500 text-xl" />
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <>
                            <span className="text-green-500 font-medium">85 </span>
                            <span className="text-500">responded</span>
                        </>
                    )}
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Recent Sales</h5>
                    {loading ? renderSkeleton() : (
                        <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
                            <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                            <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                            <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
                            <Column
                                header="View"
                                style={{ width: '15%' }}
                                body={() => (
                                    <>
                                        <Button icon="pi pi-search" type="button" className="p-button-text" />
                                    </>
                                )}
                            />
                        </DataTable>
                    )}
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Traffic</h5>
                    {loading ? (
                        <Skeleton width="100%" height="20rem" />
                    ) : (
                        <Chart type="line" data={lineData} options={lineOptions} />
                    )}
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>To-Do List</h5>
                    {loading ? renderSkeleton() : (
                        <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                                <div className="checkbox-field mr-2">
                                    <input type="checkbox" id="task-1" />
                                    <label htmlFor="task-1" className="p-checkbox-label"></label>
                                </div>
                                <span className="line-height-3">Meeting with Andrea</span>
                            </li>
                            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                                <div className="checkbox-field mr-2">
                                    <input type="checkbox" id="task-2" />
                                    <label htmlFor="task-2" className="p-checkbox-label"></label>
                                </div>
                                <span className="line-height-3">Team Meeting</span>
                            </li>
                            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                                <div className="checkbox-field mr-2">
                                    <input type="checkbox" id="task-3" />
                                    <label htmlFor="task-3" className="p-checkbox-label"></label>
                                </div>
                                <span className="line-height-3">Contacting Adrian</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Tickets</h5>
                    {loading ? renderSkeleton() : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Ticket ID</th>
                                        <th>Summary</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#123456</td>
                                        <td>Lorem ipsum dolor sit amet</td>
                                        <td>
                                            <span className="badge bg-info">Open</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#234567</td>
                                        <td>Lorem ipsum dolor sit amet</td>
                                        <td>
                                            <span className="badge bg-success">Closed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#345678</td>
                                        <td>Lorem ipsum dolor sit amet</td>
                                        <td>
                                            <span className="badge bg-warning">Pending</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
