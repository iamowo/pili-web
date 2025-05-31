import { useEffect, useState, useRef } from "react";
import Noresult from "../../components/common/NoResult";
import TopNav from "../../components/video/TopNav";
import Banner from "../../components/video/Banner";
import VideoShow from "../../components/video/VideoShow";

import "./scss/home.scss";

function VideoHome() {
  const userinfo = JSON.parse(localStorage.getItem("userinfo")),
    uid = userinfo ? userinfo.uid : -1,
    logined = uid !== -1;

  const [recommendlist, setRecommend] = useState([]), // 推荐
    [videolist, setVideolist] = useState([]), // 主视频
    [vids, setVids] = useState([]),
    [bannerlist, setBannerlist] = useState([]); // 轮播图
  const lazyLoadTimer = useRef(null); // 下拉加载
  const changeOneBitchTimer = useRef(false), // 推荐 换一换
    [iconflag, setIconflag] = useState(false); // 换一换动画

  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await Promise.all([
  //       getRandom(5),
  //       getRandom(6),
  //       getBanner(),
  //     ]);
  //     setVideolist(result[0]);
  //     for (let i = 0; i < result[0].length; i++) {
  //       setVids([...vids, result[0][i].vid]);
  //     }
  //     setRecommend(result[1]);
  //     setBannerlist(result[2]);
  //   };
  //   getData();
  //   document.title = "啤哩啤哩 (゜-゜)つロ 干杯~-pilipili";
  // }, []);

  // // 下拉刷新
  // useEffect(() => {
  //   // 第二个参数是空的话，形成了闭包，导致不会更新
  //   const lazyloadfnc = () => {
  //     var a =
  //       document.body.clientHeight || document.documentElement.clientHeight;
  //     var b = document.body.scrollTop || document.documentElement.scrollTop;
  //     var c =
  //       window.innerHeight ||
  //       document.documentElement.clientHeight ||
  //       document.body.clientHeight;

  //     if (a <= Math.ceil(b + c) && b > 0) {
  //       if (lazyLoadTimer.current != null) {
  //         return;
  //       } else {
  //         lazyLoadTimer.current = setTimeout(async () => {
  //           console.log(vids);
  //           const res = await getSomeVideos(vids, 5);
  //           const temp = [...videolist, ...res];
  //           console.log("old:", videolist);
  //           console.log("new video:", temp);
  //           setVideolist(temp);
  //           if (res != null && res.length > 0) {
  //             for (let i = 0; i < res[0].length; i++) {
  //               setVids([...vids, res[0][i].vid]);
  //             }
  //           } else {
  //             message.open({ type: "info", content: "没有更多了", flag: true });
  //           }
  //           lazyLoadTimer.current = null;
  //         }, 1500);
  //       }
  //     }
  //   };
  //   document.addEventListener("scroll", lazyloadfnc);
  //   return () => {
  //     document.removeEventListener("scroll", lazyloadfnc);
  //   };
  // }, [videolist]);

  // // 换一换
  const changapart = (e) => {
    // 节流
    // if (changeOneBitchTimer.current) {
    //   return;
    // }
    // setIconflag(true);
    // changeOneBitchTimer.current = true;
    // setTimeout(async () => {
    //   const res = await getRandom(6);
    //   setRecommend(res);
    //   setIconflag(false);
    //   changeOneBitchTimer.current = false;
    // }, 1200);
  };

  return (
    <div className="conbox">
      123
      <TopNav />
      {recommendlist.length > 0 && videolist.length > 0 ? (
        <div className="mainbox">
          {/* <MemoNav2 uid={uid} logined={logined} /> */}
          <div className="innerbox">
            <div className="changpart" onClick={changapart}>
              <div
                className={iconflag ? "iconani icon iconfont" : "icon iconfont"}
              >
                &#xe614;
              </div>
              <span className="changspan2">换一换</span>
            </div>
            <div className="bottompart">
              <div className="bbox1 icon iconfont b1">&#xe646;</div>
              <div className="bbox1 icon iconfont b2">&#xe615;</div>
              <div
                className="bbox1 bx2"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  });
                }}
              >
                <div className="icon iconfont">&#xe628;</div>
                <div className="totoptext">顶部</div>
              </div>
            </div>
            <div className="bannerpart">
              {bannerlist.length > 0 && (
                <Banner
                  playflag={true}
                  bannerlist={bannerlist}
                  listLength={bannerlist.length}
                />
              )}
            </div>
            <div className="toprecbox">
              {recommendlist.map((item, index) => (
                <VideoShow key={item.vid} data={item} index={index} />
              ))}
            </div>
            {videolist.map(
              (item, index) => (
                <VideoShow
                  key={item.vid}
                  data={item}
                  index={index}
                  style1="yes"
                />
              )
              // <div key={item.vid} className="onevideo">{item.vid}</div>
            )}
          </div>
          {
            <div className="loadmore-line">
              <span>加载更多</span>
              <div>
                <span className="iconfont sp1">&#xec1e;</span>
                <span className="iconfont sp2">&#xec1e;</span>
                <span className="iconfont sp3">&#xec1e;</span>
              </div>
            </div>
          }
        </div>
      ) : (
        <div className="noresult-b">
          <Noresult />
        </div>
      )}
    </div>
  );
}

export default VideoHome;
