/*
 Highcharts JS v8.0.0 (2019-12-10)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (c) { "object" === typeof module && module.exports ? (c["default"] = c, module.exports = c) : "function" === typeof define && define.amd ? define("highcharts/modules/export-data", ["highcharts", "highcharts/modules/exporting"], function (q) { c(q); c.Highcharts = q; return c }) : c("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (c) {
  function q(b, a, c, F) { b.hasOwnProperty(a) || (b[a] = F.apply(null, c)) } c = c ? c._modules : {}; q(c, "mixins/ajax.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function (b, a) {
    var c = a.objectEach;
    b.ajax = function (a) {
      var h = b.merge(!0, { url: !1, type: "get", dataType: "json", success: !1, error: !1, data: !1, headers: {} }, a); a = { json: "application/json", xml: "application/xml", text: "text/plain", octet: "application/octet-stream" }; var f = new XMLHttpRequest; if (!h.url) return !1; f.open(h.type.toUpperCase(), h.url, !0); h.headers["Content-Type"] || f.setRequestHeader("Content-Type", a[h.dataType] || a.text); c(h.headers, function (a, b) { f.setRequestHeader(b, a) }); f.onreadystatechange = function () {
        if (4 === f.readyState) {
          if (200 === f.status) {
            var a =
              f.responseText; if ("json" === h.dataType) try { a = JSON.parse(a) } catch (n) { h.error && h.error(f, n); return } return h.success && h.success(a)
          } h.error && h.error(f, f.responseText)
        }
      }; try { h.data = JSON.stringify(h.data) } catch (e) { } f.send(h.data || !0)
    }; b.getJSON = function (a, c) { b.ajax({ url: a, success: c, dataType: "json", headers: { "Content-Type": "text/plain" } }) }
  }); q(c, "mixins/download-url.js", [c["parts/Globals.js"]], function (b) {
    var a = b.win, c = a.navigator, q = a.document, h = a.URL || a.webkitURL || a, f = /Edge\/\d+/.test(c.userAgent); b.dataURLtoBlob =
      function (b) { if ((b = b.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < b.length && a.atob && a.ArrayBuffer && a.Uint8Array && a.Blob && h.createObjectURL) { var c = a.atob(b[3]), e = new a.ArrayBuffer(c.length); e = new a.Uint8Array(e); for (var d = 0; d < e.length; ++d)e[d] = c.charCodeAt(d); b = new a.Blob([e], { type: b[1] }); return h.createObjectURL(b) } }; b.downloadURL = function (e, h) {
        var p = q.createElement("a"); if ("string" === typeof e || e instanceof String || !c.msSaveOrOpenBlob) {
          if (f || 2E6 < e.length) if (e = b.dataURLtoBlob(e), !e) throw Error("Failed to convert to blob");
          if ("undefined" !== typeof p.download) p.href = e, p.download = h, q.body.appendChild(p), p.click(), q.body.removeChild(p); else try { var d = a.open(e, "chart"); if ("undefined" === typeof d || null === d) throw Error("Failed to open window"); } catch (A) { a.location.href = e }
        } else c.msSaveOrOpenBlob(e, h)
      }
  }); q(c, "modules/export-data.src.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function (b, a) {
    function c(b, a) {
      var c = n.navigator, w = -1 < c.userAgent.indexOf("WebKit") && 0 > c.userAgent.indexOf("Chrome"), l = n.URL || n.webkitURL || n; try {
        if (c.msSaveOrOpenBlob &&
          n.MSBlobBuilder) { var e = new n.MSBlobBuilder; e.append(b); return e.getBlob("image/svg+xml") } if (!w) return l.createObjectURL(new n.Blob(["\ufeff" + b], { type: a }))
      } catch (G) { }
    } var q = a.defined, h = a.extend, f = a.isObject, e = a.pick, n = b.win, p = n.document, d = b.seriesTypes, A = b.downloadURL, C = b.fireEvent; b.setOptions({
      exporting: { csv: { columnHeaderFormatter: null, dateFormat: "%Y-%m-%d %H:%M:%S", decimalPoint: null, itemDelimiter: null, lineDelimiter: "\n" }, showTable: !1, useMultiLevelHeaders: !0, useRowspanHeaders: !0 }, lang: {
        downloadCSV: "Download CSV",
        downloadXLS: "Download XLS", openInCloud: "Open in Highcharts Cloud", viewData: "View data table"
      }
    }); b.addEvent(b.Chart, "render", function () { this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport && this.viewData() }); b.Chart.prototype.setUpKeyToAxis = function () { d.arearange && (d.arearange.prototype.keyToAxis = { low: "y", high: "y" }); d.gantt && (d.gantt.prototype.keyToAxis = { start: "x", end: "x" }) }; b.Chart.prototype.getDataRows = function (a) {
      var c = this.hasParallelCoordinates,
      h = this.time, w = this.options.exporting && this.options.exporting.csv || {}, l = this.xAxis, d = {}, f = [], p = [], n = [], y, z = function (k, c, g) { if (w.columnHeaderFormatter) { var d = w.columnHeaderFormatter(k, c, g); if (!1 !== d) return d } return k ? k instanceof b.Axis ? k.options.title && k.options.title.text || (k.isDatetimeAxis ? "DateTime" : "Category") : a ? { columnTitle: 1 < g ? c : k.name, topLevelColumnTitle: k.name } : k.name + (1 < g ? " (" + c + ")" : "") : "Category" }, D = function (a, c, g) {
        var k = {}, d = {}; c.forEach(function (c) {
          var e = (a.keyToAxis && a.keyToAxis[c] || c) +
            "Axis"; e = b.isNumber(g) ? a.chart[e][g] : a[e]; k[c] = e && e.categories || []; d[c] = e && e.isDatetimeAxis
        }); return { categoryMap: k, dateTimeValueAxisMap: d }
      }, g = []; var u = 0; this.setUpKeyToAxis(); this.series.forEach(function (k) {
        var t = k.options.keys || k.pointArrayMap || ["y"], r = t.length, v = !k.requireSorting && {}, f = l.indexOf(k.xAxis), B = D(k, t), m; if (!1 !== k.options.includeInDataExport && !k.options.isInternal && !1 !== k.visible) {
          b.find(g, function (a) { return a[0] === f }) || g.push([f, u]); for (m = 0; m < r;)y = z(k, t[m], t.length), n.push(y.columnTitle ||
            y), a && p.push(y.topLevelColumnTitle || y), m++; var q = { chart: k.chart, autoIncrement: k.autoIncrement, options: k.options, pointArrayMap: k.pointArrayMap }; k.options.data.forEach(function (a, b) {
              c && (B = D(k, t, b)); var g = { series: q }; k.pointClass.prototype.applyOptions.apply(g, [a]); a = g.x; var l = k.data[b] && k.data[b].name; m = 0; k.xAxis && "name" !== k.exportKey || (a = l); v && (v[a] && (a += "|" + b), v[a] = !0); d[a] || (d[a] = [], d[a].xValues = []); d[a].x = g.x; d[a].name = l; for (d[a].xValues[f] = g.x; m < r;)b = t[m], l = g[b], d[a][u + m] = e(B.categoryMap[b][l],
                B.dateTimeValueAxisMap[b] ? h.dateFormat(w.dateFormat, l) : null, l), m++
            }); u += m
        }
      }); for (r in d) Object.hasOwnProperty.call(d, r) && f.push(d[r]); var r = a ? [p, n] : [n]; for (u = g.length; u--;) {
        var t = g[u][0]; var v = g[u][1]; var x = l[t]; f.sort(function (a, b) { return a.xValues[t] - b.xValues[t] }); var E = z(x); r[0].splice(v, 0, E); a && r[1] && r[1].splice(v, 0, E); f.forEach(function (a) {
          var b = a.name; x && !q(b) && (x.isDatetimeAxis ? (a.x instanceof Date && (a.x = a.x.getTime()), b = h.dateFormat(w.dateFormat, a.x)) : b = x.categories ? e(x.names[a.x], x.categories[a.x],
            a.x) : a.x); a.splice(v, 0, b)
        })
      } r = r.concat(f); C(this, "exportData", { dataRows: r }); return r
    }; b.Chart.prototype.getCSV = function (a) {
      var b = "", c = this.getDataRows(), d = this.options.exporting.csv, l = e(d.decimalPoint, "," !== d.itemDelimiter && a ? (1.1).toLocaleString()[1] : "."), h = e(d.itemDelimiter, "," === l ? ";" : ","), f = d.lineDelimiter; c.forEach(function (a, d) {
        for (var e, m = a.length; m--;)e = a[m], "string" === typeof e && (e = '"' + e + '"'), "number" === typeof e && "." !== l && (e = e.toString().replace(".", l)), a[m] = e; b += a.join(h); d < c.length - 1 && (b +=
          f)
      }); return b
    }; b.Chart.prototype.getTable = function (a) {
      var b = '<table id="highcharts-data-table-' + this.index + '">', c = this.options, d = a ? (1.1).toLocaleString()[1] : ".", h = e(c.exporting.useMultiLevelHeaders, !0); a = this.getDataRows(h); var f = 0, l = h ? a.shift() : null, q = a.shift(), n = function (a, b, c, h) { var g = e(h, ""); b = "text" + (b ? " " + b : ""); "number" === typeof g ? (g = g.toString(), "," === d && (g = g.replace(".", d)), b = "number") : h || (b = "empty"); return "<" + a + (c ? " " + c : "") + ' class="' + b + '">' + g + "</" + a + ">" }; !1 !== c.exporting.tableCaption && (b +=
        '<caption class="highcharts-table-caption">' + e(c.exporting.tableCaption, c.title.text ? c.title.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : "Chart") + "</caption>"); for (var p = 0, z = a.length; p < z; ++p)a[p].length > f && (f = a[p].length); b += function (a, b, e) {
          var d = "<thead>", f = 0; e = e || b && b.length; var g, l = 0; if (g = h && a && b) { a: if (g = a.length, b.length === g) { for (; g--;)if (a[g] !== b[g]) { g = !1; break a } g = !0 } else g = !1; g = !g } if (g) {
            for (d += "<tr>"; f <
              e; ++f) { g = a[f]; var m = a[f + 1]; g === m ? ++l : l ? (d += n("th", "highcharts-table-topheading", 'scope="col" colspan="' + (l + 1) + '"', g), l = 0) : (g === b[f] ? c.exporting.useRowspanHeaders ? (m = 2, delete b[f]) : (m = 1, b[f] = "") : m = 1, d += n("th", "highcharts-table-topheading", 'scope="col"' + (1 < m ? ' valign="top" rowspan="' + m + '"' : ""), g)) } d += "</tr>"
          } if (b) { d += "<tr>"; f = 0; for (e = b.length; f < e; ++f)"undefined" !== typeof b[f] && (d += n("th", null, 'scope="col"', b[f])); d += "</tr>" } return d + "</thead>"
        }(l, q, Math.max(f, q.length)); b += "<tbody>"; a.forEach(function (a) {
          b +=
          "<tr>"; for (var c = 0; c < f; c++)b += n(c ? "td" : "th", null, c ? "" : 'scope="row"', a[c]); b += "</tr>"
        }); b += "</tbody></table>"; a = { html: b }; C(this, "afterGetTable", a); return a.html
    }; b.Chart.prototype.downloadCSV = function () { var a = this.getCSV(!0); A(c(a, "text/csv") || "data:text/csv,\ufeff" + encodeURIComponent(a), this.getFilename() + ".csv") }; b.Chart.prototype.downloadXLS = function () {
      var a = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
        this.getTable(!0) + "</body></html>"; A(c(a, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + n.btoa(unescape(encodeURIComponent(a))), this.getFilename() + ".xls")
    }; b.Chart.prototype.viewData = function () { this.dataTableDiv || (this.dataTableDiv = p.createElement("div"), this.dataTableDiv.className = "highcharts-data-table", this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling)); this.dataTableDiv.innerHTML = this.getTable(); C(this, "afterViewData", this.dataTableDiv) }; b.Chart.prototype.openInCloud =
      function () {
        function a(b) { Object.keys(b).forEach(function (c) { "function" === typeof b[c] && delete b[c]; f(b[c]) && a(b[c]) }) } var c = b.merge(this.userOptions); a(c); c = { name: c.title && c.title.text || "Chart title", options: c, settings: { constructor: "Chart", dataProvider: { csv: this.getCSV() } } }; var d = JSON.stringify(c); (function () {
          var a = p.createElement("form"); p.body.appendChild(a); a.method = "post"; a.action = "https://cloud-api.highcharts.com/openincloud"; a.target = "_blank"; var b = p.createElement("input"); b.type = "hidden"; b.name =
            "chart"; b.value = d; a.appendChild(b); a.submit(); p.body.removeChild(a)
        })()
      }; if (a = b.getOptions().exporting) h(a.menuItemDefinitions, { downloadCSV: { textKey: "downloadCSV", onclick: function () { this.downloadCSV() } }, downloadXLS: { textKey: "downloadXLS", onclick: function () { this.downloadXLS() } }, viewData: { textKey: "viewData", onclick: function () { this.viewData() } }, openInCloud: { textKey: "openInCloud", onclick: function () { this.openInCloud() } } }), a.buttons && a.buttons.contextButton.menuItems.push("separator", "downloadCSV", "downloadXLS",
        "viewData", "openInCloud"); d.map && (d.map.prototype.exportKey = "name"); d.mapbubble && (d.mapbubble.prototype.exportKey = "name"); d.treemap && (d.treemap.prototype.exportKey = "name")
  }); q(c, "masters/modules/export-data.src.js", [], function () { })
});
//# sourceMappingURL=export-data.js.map