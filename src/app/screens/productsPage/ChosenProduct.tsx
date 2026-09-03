import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { CartInterface } from "../../../lib/types/cart";
import { Product } from "../../../lib/types/product";
import { catalogProducts, formatPrice, getProductImage } from "./catalog";

export default function ChosenProduct({ cart }: { cart: CartInterface }) {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(() => catalogProducts.find((item) => item._id === productId));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const catalogProduct = catalogProducts.find((item) => item._id === productId);
    setProduct(catalogProduct);
    setSelectedImage(0);
    if (!catalogProduct && serverApi && serverApi !== "undefined") new ProductService().getProduct(productId).then(setProduct).catch(() => setProduct(undefined));
  }, [productId]);

  useEffect(() => {
    setSelectedSize(product?.productSizes[0] ?? "ONESIZE");
    setSelectedColor(product?.productColors[0] ?? "");
  }, [product]);

  if (!product) return <Container maxWidth="lg" className="product-detail__not-found"><Typography component="h2">This piece is no longer available.</Typography><Button component={Link} to="/products" startIcon={<ArrowBackIcon />}>Back to shop</Button></Container>;

  const images = product.productImages.length ? product.productImages : [getProductImage(product)];
  const price = product.productDiscountPrice ?? product.productPrice;
  const addToBag = () => cart.onAdd({ productId: product._id, productName: product.productName, unitPrice: price, quantity: 1, imageUrl: images[selectedImage], selectedSize, selectedColor: selectedColor || undefined });

  return <Box component="section" className="product-detail"><Container maxWidth="lg"><Button component={Link} to="/products" className="product-detail__back" startIcon={<ArrowBackIcon />}>All pieces</Button><Box className="product-detail__layout"><Stack className="product-detail__gallery" direction="row"><Stack className="product-detail__thumbnails">{images.map((image, index) => <button type="button" className={selectedImage === index ? "is-active" : ""} onClick={() => setSelectedImage(index)} key={image}><img src={image} alt={`${product.productName} view ${index + 1}`}/></button>)}</Stack><Box className="product-detail__image"><img src={images[selectedImage]} alt={product.productName}/></Box></Stack><Stack className="product-detail__info" spacing={2.5}><Typography className="product-detail__collection">{product.productCollection.toLowerCase()}</Typography><Typography component="h2" className="product-detail__name">{product.productName}</Typography><Stack direction="row" className="product-detail__views" alignItems="center"><VisibilityOutlinedIcon /> {product.productViews} views</Stack><Stack direction="row" alignItems="baseline" spacing={1.25}><Typography className="product-detail__price">{formatPrice(price)}</Typography>{price !== product.productPrice && <Typography className="product-detail__old-price">{formatPrice(product.productPrice)}</Typography>}</Stack><Typography className="product-detail__description">{product.productDesc || "A versatile Coco essential, thoughtfully designed for repeat wear."}</Typography>{product.productSizes.length > 0 && <Box><Typography className="product-detail__label">Size</Typography><Stack className="product-detail__options" direction="row">{product.productSizes.map((size) => <Button className={selectedSize === size ? "is-active" : ""} onClick={() => setSelectedSize(size)} key={size}>{size}</Button>)}</Stack></Box>}{product.productColors.length > 0 && <Box><Typography className="product-detail__label">Colour</Typography><Stack className="product-detail__options" direction="row">{product.productColors.map((color) => <Button className={selectedColor === color ? "is-active" : ""} onClick={() => setSelectedColor(color)} key={color}>{color}</Button>)}</Stack></Box>}<Button className="product-detail__add" variant="contained" onClick={addToBag} startIcon={<ShoppingBagOutlinedIcon />}>Add to bag</Button><Typography className="product-detail__stock">{product.productStock > 0 ? `${product.productStock} in stock` : "Currently unavailable"}</Typography></Stack></Box></Container></Box>;
}
