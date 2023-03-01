import { useParams, Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Store/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../../Store/cartSlice";

import { useNavigate } from "react-router-dom";

import Navbar from "../../Homepage/Nav/Navbar";

import "./ProductDetails.css";

const ProductDetails = () => {
  const getData = localStorage.getItem("products") ?? "[]";
  const productArray = JSON.parse(getData);
  const setProducts = () => {
    localStorage.setItem("products", JSON.stringify(productArray));
  };

  const count = useSelector((state) => state.cart.count);
  const addCart = useSelector((state) => state.cart.addCart);
  console.log({ count });
  console.log({ addCart });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const addCartHandler = () => {
    dispatch(counterActions.addCart(data));
  };

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });
  const { data: datas } = useGetAllProductsQuery();
  const { dataId } = useParams();

  const data =
    datas &&
    datas.length > 0 &&
    datas.filter((data) => data._id.$oid === dataId);
  // const { img1, price, name, long_desc } = data;
  console.log({ data });
  console.log({ productArray });

  productArray.push(data);

  if (data !== undefined && data[0] !== undefined) {
    console.log(data[0]._id.$oid);

    return (
      <>
        <Navbar />
        <div className="productdetail" key={Math.random()}>
          <div className="detail">
            <div></div>
            <div className="imgList">
              <div className="detailImg1" key={Math.random()}>
                <img src={data[0].img1} alt={data[0].name} />
              </div>
              <div className="detailImg2" key={Math.random()}>
                <img src={data[0].img2} alt={data[0].name} />
              </div>
              <div className="detailImg3" key={Math.random()}>
                <img src={data[0].img3} alt={data[0].name} />
              </div>
              <div className="detailImg4" key={Math.random()}>
                <img src={data[0].img4} alt={data[0].name} />
              </div>
            </div>

            <div className="img" key={Math.random()}>
              <img src={data[0].img1} alt={data[0].name} />
            </div>

            <div className="detailInfo">
              <h1 className="detailName" key={Math.random()}>
                {data[0].name}
              </h1>
              <div key={Math.random()} className="detailPrice">
                {formatter.format(data[0].price) + " VND"}
              </div>
              <div className="detailDesc" key={Math.random()}>
                {data[0].short_desc}
              </div>
              <div className="detailCat">CATEGORY : {data[0].category}</div>
              <div className="cartButton" key={Math.random()}>
                <button onClick={decrementHandler}>-</button>
                <div className="countAmount">{count}</div>
                <button onClick={incrementHandler}>+</button>
                <div className="artCart">
                  <button
                    onClick={() => {
                      setProducts(data);
                      navigate("/cart");
                      addCartHandler(data);
                    }}
                  >
                    Art to cart
                  </button>
                </div>
              </div>

              <Link to="/shop" className="back">
                Back To Shoppage
              </Link>
            </div>
          </div>
          <div className="longDesc">
            <h2>PRODUCT DESCRIPTION</h2>
            <div key={Math.random()} className="longDetail">
              {data[0].long_desc}
            </div>
          </div>
          <div className="relatePost">
            <h2>RELATED POSTS</h2>
            <div className="related" key={Math.random()}>
              {datas
                ?.filter((item) => item.category === data[0].category)
                ?.map((item) => {
                  if (item !== undefined && item._id.$oid !== dataId) {
                    return (
                      <>
                        <Link to={`/shop/${item._id.$oid}`} key={Math.random()}>
                          <div key={Math.random()} className="relatedImg">
                            <img src={item.img1} alt="" key={Math.random()} />
                          </div>
                          <div className="relatedName" key={Math.random()}>
                            {item.name}
                          </div>
                          <div key={Math.random()} className="relatedPrice">
                            {formatter.format(item.price) + " VND"}
                          </div>
                        </Link>
                      </>
                    );
                  } else return "";
                })}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProductDetails;
