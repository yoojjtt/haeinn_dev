function myFunction() {
    var input, filter, tbody, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    tbody = document.getElementById("daily_employee_list");
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {

        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];

        if (td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1) {

            tr[i].style.display = "";
            //tr[i].style.visibility ="visible";
            //td0.style.width = "10%";


        } else {
            tr[i].style.display = "none";
            //tr[i].style.visibility = "hidden";

        }
    }
}