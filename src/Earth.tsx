import { useEffect } from "react";
import "./earth.css";
import { motion } from "framer-motion";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import amazonThumb from "../src/assets/amazon.png";
import himalayaThumb from "./assets/himalaya.jpg";
import newyorkThumb from "./assets/newyork.png";

const Earth = () => {
  const Amazon = () => {
    window.location.href =
      "https://www.onthegotours.com/South-America/Guides/Visiting-the-Amazon-Rainforest";
  };

  const Himalaya = () => {
    window.location.href =
      "https://travel.cephalor.com/my-trips-to-the-himalayas/";
  };

  const NewYork = () => {
    window.location.href =
      "https://www.tripoto.com/new-york/trips/my-first-time-in-new-york-city-blog-of-the-things-595f37ae9e87e";
  };

  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.deltaLatitude = -20;
    chart.padding(20, 20, 20, 20);

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    //polygonSeries.include = ["BR", "UA", "MX", "CI"];

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#FF6633");
    polygonTemplate.stroke = am4core.color("#000033");
    polygonTemplate.strokeWidth = 0.5;
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    polygonTemplate.url = "https://www.datadrum.com/main.php?package={id}";
    polygonTemplate.urlTarget = "_blank";

    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
    graticuleSeries.fitExtent = false;

    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
    chart.backgroundSeries.mapPolygons.template.polygon.fill =
      am4core.color("#ffffff");

    // Created hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

    let animation;
    setTimeout(function () {
      animation = chart.animate(
        { property: "deltaLongitude", to: 100000 },
        20000000
      );
    }, 3000);

    chart.seriesContainer.events.on("down", function () {
      //  animation.stop();
    });
  }, []);

  return (
    <>
      <div className="main-container">
        <div id="chartdiv"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.0, duration: 2.5 }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="Slider">
            <div className="sliderSubCon">
              <div className="Amazon">
                <div className="AmazonForest">AMAZON FOREST</div>
                <img
                  className="amazonthumb"
                  src={amazonThumb}
                  alt=""
                  onClick={Amazon}
                />
              </div>
              <div className="vector-con">
                <div className="Vector"></div>
                <div className="Line6"></div>
              </div>
            </div>

            <div className="sliderSubCon">
              <div className="Himalaya">
                <div className="himalaya">HIMALAYAS</div>
                <img
                  className="himalayathumb"
                  src={himalayaThumb}
                  alt=""
                  onClick={Himalaya}
                />
              </div>
              <div className="vector-con">
                <div className="Vector"></div>
                <div className="Line6"></div>
              </div>
            </div>

            <div className="sliderSubCon">
              <div className="NewYorkCity">
                <div className="newyork">NEW YORK</div>
                <img
                  className="newyorkthumb"
                  src={newyorkThumb}
                  alt=""
                  onClick={NewYork}
                />
              </div>
              <div className="vector-con">
                <div className="Vector"></div>
                <div className="Line6"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Earth;
