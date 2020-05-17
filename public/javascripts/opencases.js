let content = '';
let temp = '';
$.ajax({
    type: "get",
    url: 'http://' + window.location.host + '/api/getOpenCases',
    dataType: "json",
    success: function(data) {
        console.log(data.length)
            //alert('Success!');
            //console.log(data)
        for (let index = 0; index <= data.length - 1; index++) {
            content += ' <div class="col-md-4">'
            content += '    <div class="card mb-4 box-shadow">'
            content += '      <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Кейс №' + data[index].id + '" alt="Кейс №' + data[index].id + ' [100%x225]" style="height: 225px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1693054c8b0%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1693054c8b0%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7265625%22%20y%3D%22120.3%22%3EКейс №' + data[index].id + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'
            content += '      <div class="card-body">'
            content += '        <p class="card-text">' + data[index].name + '</p>'
            content += '        <div class="d-flex justify-content-between align-items-center">'
            content += '          <div class="btn-group">'
            content += '            <a  href="./case/' + data[index].id + '" class="btn btn-sm btn-outline-secondary">Начать</a>'
            content += '          </div>'
                // content += '          <small class="text-muted">' + (JSON.parse(data[index].questions).time) + ' мин.</small>'
            content += '        </div>'
            content += '      </div>'
            content += '    </div>'
            content += '</div>'
            $("#container").append(content);
            content = "";
        }

    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
    }
});
console.log(temp)
console.log(window.location.host)