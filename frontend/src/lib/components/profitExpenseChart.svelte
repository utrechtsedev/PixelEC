<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
      let chart;
      let options = {   series: [52.8, 26.8, 20.4],
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: "65%",
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25
        }
      },
    },
    labels: ["Direct", "Organic search", "Referrals"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%"
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value  + "%"
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  }
    onMount(async () => {
      if (browser) {
      const ApexCharts = (await import('apexcharts')).default;
        const chartElement = document.getElementById('profitExpenseChart');
        chart = new ApexCharts(chartElement, options);
        await chart.render();
      }
    });
  
    // Cleanup on destroy
    onDestroy(() => {
      if (chart) chart.destroy();
    });
</script>

<div class="w-full md:h-[52vh] h-[59vh] rounded-xl shadow-xl bg-base-200 p-4 md:p-6 border border-base-300">
    <div class="flex justify-between">
      <div>
        <h5 class="leading-none text-3xl font-bold pb-2">101.2k Unique Visitors</h5>
        <p class="text-base font-normal">Visitor Analytics</p>
      </div>
      <!-- TODO: Arrow up arrow down system -->
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-green-500 text-center">
        12%
        <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
        </svg>
      </div>
    </div>
    {#if browser}
        <div id="profitExpenseChart"></div>
    {/if}
    <div class="grid grid-cols-1 items-center border-t border-base-300 justify-between">
      <div class="flex justify-between items-center pt-5">
        <!-- Button -->
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          data-dropdown-placement="bottom"
          class="text-sm font-medium text-gray-400 text-center inline-flex items-center"
          type="button">
          Last 7 days
          <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="lastDaysdropdown" class="z-10 hidden divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-gray-700">
            <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="/" class="block px-4 py-2 ">Yesterday</a>
              </li>
              <li>
                <a href="/" class="block px-4 py-2 hover:bg-primary">Today</a>
              </li>
              <li>
                <a href="/" class="block px-4 py-2 hover:bg-primary">Last 7 days</a>
              </li>
              <li>
                <a href="/" class="block px-4 py-2 hover:bg-primary">Last 30 days</a>
              </li>
              <li>
                <a href="/" class="block px-4 py-2 hover:bg-primary">Last 90 days</a>
              </li>
            </ul>
        </div>
        <a
          href="/"
          class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600  hover:bg-primary px-3 py-2">
          Users Report
          <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </div>
    </div>
  </div>