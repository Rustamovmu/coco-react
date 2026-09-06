import React, { useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { CartInterface } from "../../../lib/types/cart";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { formatPrice, getProductImage } from "./catalog";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { FREE_DELIVERY_THRESHOLD } from "../../../lib/pricing";

export default function ChosenProduct({ cart }: { cart: CartInterface }) {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    let active = true;
    setProduct(undefined);
    setLoadingProduct(true);
    setSelectedImage(0);
    new ProductService().getProduct(productId)
      .then((result) => { if (active) setProduct(result); })
      .catch(() => { if (active) setProduct(undefined); })
      .finally(() => { if (active) setLoadingProduct(false); });
    return () => { active = false; };
  }, [productId]);

  useEffect(() => {
    setSelectedSize(product?.productSizes[0] ?? "ONESIZE");
    setSelectedColor(product?.productColors[0] ?? "");
  }, [product]);

  const currentProductId = product?._id;
  const currentCollection = product?.productCollection;

  useEffect(() => {
    if (!currentProductId || !currentCollection) {
      setRelatedProducts([]);
      setLoadingRelated(false);
      return;
    }

    let active = true;
    setRelatedProducts([]);
    setLoadingRelated(true);
    new ProductService().getProducts({
      page: 1,
      limit: 5,
      order: "productViews",
      sort: "desc",
      productCollection: currentCollection,
    }).then((items) => {
      if (active) setRelatedProducts(items.filter((item) => item._id !== currentProductId).slice(0, 4));
    }).catch(() => {
      if (active) setRelatedProducts([]);
    }).finally(() => {
      if (active) setLoadingRelated(false);
    });

    return () => { active = false; };
  }, [currentCollection, currentProductId]);

  if (loadingProduct) return <Container maxWidth="lg" className="product-detail__not-found"><Typography component="h2">Loading this piece…</Typography></Container>;
  if (!product) return <Container maxWidth="lg" className="product-detail__not-found"><Typography component="h2">This piece is no longer available.</Typography><Button component={Link} to="/products" startIcon={<ArrowBackIcon />}>Back to shop</Button></Container>;

  const images = product.productImages.length ? product.productImages : [getProductImage(product)];
  const price = product.productDiscountPrice ?? product.productPrice;
  const addToBag = () => cart.onAdd({ productId: product._id, productName: product.productName, unitPrice: price, quantity: 1, imageUrl: images[selectedImage], selectedSize, selectedColor: selectedColor || undefined });
  const toggleLike = async () => {
    try {
      const result = await new ProductService().toggleLike(product._id);
      setProduct((current) => current ? { ...current, ...result } : current);
    } catch (error) {
      await sweetErrorHandling(error);
    }
  };

  return <Box component="section" className="product-detail">
    <Container maxWidth="lg">
      <Button component={Link} to="/products" className="product-detail__back" startIcon={<ArrowBackIcon />}>Back to collection</Button>
      <Box className="product-detail__layout">
        <Stack className="product-detail__gallery" direction="row">
          <Stack className="product-detail__thumbnails">{images.map((image, index) => <button type="button" className={selectedImage === index ? "is-active" : ""} onClick={() => setSelectedImage(index)} key={image}><img src={image} alt={`${product.productName} view ${index + 1}`}/></button>)}</Stack>
          <Box className="product-detail__image"><img src={images[selectedImage]} alt={product.productName}/></Box>
        </Stack>
        <Stack className="product-detail__info">
          <Typography className="product-detail__badge">{product.productStock > 0 ? "Available now" : "Currently unavailable"}</Typography>
          <Typography className="product-detail__collection">{collectionLabels[product.productCollection]}</Typography>
          <Typography component="h1" className="product-detail__name">{product.productName}</Typography>
          <Stack direction="row" className="product-detail__engagement" alignItems="center"><Stack direction="row" className="product-detail__views" alignItems="center"><VisibilityOutlinedIcon /> {product.productViews} views</Stack><span className="product-detail__dot"/><Typography>{product.productLikes} likes</Typography></Stack>
          <Stack direction="row" alignItems="baseline" spacing={1.25}><Typography className="product-detail__price">{formatPrice(price)}</Typography>{price !== product.productPrice && <Typography className="product-detail__old-price">{formatPrice(product.productPrice)}</Typography>}</Stack>
          <Typography className="product-detail__description">{product.productDesc || "A versatile Coco essential, thoughtfully designed for repeat wear."}</Typography>
          {product.productSizes.length > 0 && <Box><Typography className="product-detail__label">Select size</Typography><Stack className="product-detail__options" direction="row">{product.productSizes.map((size) => <Button className={selectedSize === size ? "is-active" : ""} onClick={() => setSelectedSize(size)} key={size}>{size}</Button>)}</Stack></Box>}
          {product.productColors.length > 0 && <Box><Typography className="product-detail__label">Select colour</Typography><Stack className="product-detail__options" direction="row">{product.productColors.map((color) => <Button className={selectedColor === color ? "is-active" : ""} onClick={() => setSelectedColor(color)} key={color}>{color}</Button>)}</Stack></Box>}
          <Stack direction="row" className="product-detail__actions"><Button className="product-detail__add" variant="contained" onClick={addToBag} disabled={product.productStock < 1} startIcon={<ShoppingBagOutlinedIcon />}>Add to bag</Button><IconButton className={`product-detail__favorite${product.isLiked ? " is-liked" : ""}`} onClick={toggleLike} aria-label={product.isLiked ? `Unlike ${product.productName}` : `Like ${product.productName}`}>{product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton></Stack>
          <Box className="product-detail__benefits"><Box><LocalShippingOutlinedIcon/><span><strong>Free delivery</strong>Orders from ${FREE_DELIVERY_THRESHOLD}</span></Box><Box><Inventory2OutlinedIcon/><span><strong>Live stock</strong>{product.productStock} pieces available</span></Box><Box><PersonOutlineIcon/><span><strong>Your account</strong>Track every order</span></Box></Box>
        </Stack>
      </Box>
      <Box className={`product-detail__story${images[1] ? " product-detail__story--with-image" : ""}`}>
        <Box><Typography className="product-detail__story-label">Product details</Typography><Typography component="h2">Designed for everyday wear.</Typography><Typography>{product.productDesc || `${product.productName} is part of Coco's ${collectionLabels[product.productCollection]} collection, selected for an easy and lasting wardrobe.`}</Typography><ul><li>Collection: {collectionLabels[product.productCollection]}</li><li>{product.productStock} pieces currently available</li>{product.productSizes.length > 0 && <li>Available size: {product.productSizes.join(", ")}</li>}</ul></Box>
        {images[1] && <Box component="img" src={images[1]} alt={`${product.productName} detail`} />}
      </Box>
      {loadingRelated ? <Box className="related-products__empty">Loading related products…</Box> : relatedProducts.length > 0 ? <RelatedProducts products={relatedProducts} collection={product.productCollection} /> : <Box className="related-products__empty">No other products are available in this collection.</Box>}
    </Container>
  </Box>;
}

const collectionLabels: Record<ProductCollection, string> = {
  [ProductCollection.CLOTHE]: "clothing",
  [ProductCollection.PANTS]: "pants",
  [ProductCollection.HAT]: "hats",
  [ProductCollection.SHOES]: "shoes",
  [ProductCollection.OTHERS]: "accessories",
};

function RelatedProducts({ products, collection }: { products: Product[]; collection: ProductCollection }) {
  return <Box component="section" className="related-products" aria-labelledby="related-products-title">
    <Stack direction="row" justifyContent="space-between" alignItems="end" className="related-products__header">
      <Box><Typography className="related-products__eyebrow">You may also like</Typography><Typography component="h2" id="related-products-title">More in {collectionLabels[collection]}</Typography></Box>
      <Button component={Link} to={`/products?collection=${collection}`} endIcon={<ArrowForwardRoundedIcon />}>View all</Button>
    </Stack>
    <Box className="related-products__grid">{products.map((item) => <Link to={`/products/${item._id}`} className="related-product-card" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} key={item._id}><Box className="related-product-card__media"><img src={getProductImage(item)} alt={item.productName} loading="lazy"/><span><ArrowForwardRoundedIcon /></span></Box><Stack direction="row" justifyContent="space-between" spacing={1} className="related-product-card__body"><Box><Typography className="related-product-card__name">{item.productName}</Typography><Typography className="related-product-card__collection">{collectionLabels[item.productCollection]}</Typography></Box><Typography className="related-product-card__price">{formatPrice(item.productDiscountPrice ?? item.productPrice)}</Typography></Stack></Link>)}</Box>
  </Box>;
}
