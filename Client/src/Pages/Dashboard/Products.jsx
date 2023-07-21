import React, { useEffect, useState } from 'react';
import { getAllProducts, fetchProducts } from '../../features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Title from './Title';
import axios from 'axios';

function renderImageCell(params) {
    const imageUrls = params.value.split(', ');
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
                <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                style={{ width: 55, height: 55, padding: 2, marginRight: 5 }}
                />
                ))
                ) : (
                    <span>No Images</span>
                    )}
                    </div>
                    );
                }
                function renderSwitchCell(params, productRows, setProductRows) {
                    const [isPublish, setIsPublish] = useState(params.isPublish);
                    
                    const handleChange = (event) => {
                        const updatedRows = productRows.map((row) => {
                            if (row.id === params.row.id) {
                                return { ...row, col6: event.target.checked === true ? false :true };
                            }
                            return row;
                        });
                        
                        setTimeout(() => {
                            setProductRows(updatedRows);
                            setIsPublish(event.target.checked);
                        }, 500);
                        
                        const updateData = {
                            id: params.row.id,
                            isPublish: event.target.checked,
                        };
                        console.log(params.row.id)
                        
                        axios
                        .put(`http://localhost:3001/products/update`, updateData)
                        .then((response) => {
                            console.log('Update successful:', response.data);
                            setProductRows(updatedRows);
                            setIsPublish(event.target.checked);
                        })
                        .catch((error) => {
                            console.error('Error updating data:', error);
                        });
                        
                    };
                    
                    return <Switch checked={isPublish} onChange={handleChange} />;
                }
                
                // function renderDeleteCell(params) {
                //     const handleDelete = () => {
                //         console.log('Eliminar producto con ID:', params.row.id);
                //     };
                    
                //     return (
                //         <IconButton onClick={handleDelete} color="primary">
                //         <DeleteForeverIcon />
                //         </IconButton>
                //         );
                //     }
                    
                    function Products() {
                        const dispatch = useDispatch();
                        const products = useSelector(getAllProducts);
                        const [loading, setLoading] = useState(true);
                        const [row, setRows] = useState([]);
                        
                        useEffect(() => {
                            dispatch(fetchProducts())
                            .then(() => {
                                setLoading(false);
                            })
                            .catch((error) => {
                                console.error('Error fetching data:', error);
                                setLoading(false);
                            });
                        }, [dispatch]);
                        
                        const rows = products.map((product) => ({
                            id: product.id,
                            col1: product.id,
                            col2: product.item_number,
                            col3: product.model,
                            col4: product.description,
                            col5: product.discountPercentage,
                            col6: product.isPublish ? true : false,
                            col7: product.sold_count,
                            col8: product.gender,
                            col9: product.images.join(', '),
                            col10: product.brand,
                            col11: product.colors,
                            col12: product.categories.join(', '),
                            col13: product.stock.map((size) => size.size).join(', '),
                            col14: product.stock.reduce((totalStock, size) => totalStock + size.stockPerSize, 0),
                            //col15: <DeleteForeverIcon />
                        }));
                        
                        const columns = [
                            { field: 'col1', headerName: 'Id', width: 50 },
                            { field: 'col2', headerName: 'Item_Number', width: 150 },
                            { field: 'col3', headerName: 'Nombre', width: 350 },
                            { field: 'col4', headerName: 'Descripcion', width: 150 },
                            { field: 'col5', headerName: 'Porcentaje de Descuento', width: 50 },
                            {field: 'col6',
                            headerName: 'Publicado',
                            width: 150,
                            renderCell: (params) => renderSwitchCell(params, row, setRows)},
                            { field: 'col7', headerName: 'Contador de ventas', width: 100 },
                            { field: 'col8', headerName: 'Generos', width: 100 },
                            { field: 'col9', headerName: 'Imagenes', width: 250, renderCell: renderImageCell },
                            { field: 'col10', headerName: 'Marca', width: 100 },
                            { field: 'col11', headerName: 'Color', width: 100 },
                            { field: 'col12', headerName: 'Categorias', width: 150 },
                            { field: 'col13', headerName: 'Talles', width: 400 },
                            { field: 'col14', headerName: 'Stock', width: 150 },
                           // { field: 'col15', headerName: 'Eliminar', width: 150, renderCell: renderDeleteCell },
                        ];
                        
                        return (
                            <div style={{ height: '95%', width: '100%' }}>
                            <Title>Productos</Title>
                            {loading ? (
                                <span className="loading loading-bars ml-96 mt-28 loading-3xl"></span>
                                ) : (
                                    <DataGrid rows={rows} columns={columns} />
                                    )}
                                    </div>
                                    );
                                }
                                
                                export default Products;
                                