import Navbar from "../components/Navbar";
import style from "../modules/info.module.css";

function Info() {
  return (
    <>
      <Navbar />
      <div className={style.info}>
      <h1>Info</h1>
      <p>
        Idea inspired by: <a href="https://www.worldometers.info/">Worldometers.info</a>
      </p>
      <h2>How the data is calculated</h2>
      <p>The displayed values are calculated based on the following methods:</p>
      <ul>
        <li>
          <strong>Category Grouping:</strong> Data is grouped by categories, where items 
          are grouped together based on their shared base category (e.g., the part before 
          a dash in their label). This allows for summarizing trends within each group.
        </li>
        <li>
          <strong>Total Value:</strong> The sum of all item values in a category is 
          calculated and displayed as the total value.
        </li>
        <li>
          <strong>Median Value:</strong> The median of all values within a category is 
          calculated and shown as a measure of the middle point of the dataset.
        </li>
        <li>
          <strong>Yearly Trends:</strong> Using past data within a category, an average 
          yearly increase is calculated. This is used to estimate future trends.
        </li>
        <li>
          <strong>Real-Time Updates:</strong> Based on the current date, the data 
          updates dynamically to show estimated progress toward the year's final value.
        </li>
      </ul>
      <h3>Dynamic Values</h3>
      <p>
        The values displayed on the counters reflect real-time calculations of progress 
        toward the year’s estimated totals. These numbers are adjusted incrementally 
        as time progresses.
      </p>
      <p>
        If you have any questions or need more details, feel free to reach out!
      </p>
      </div>
      
    </>
  );
}

export default Info;