$(document).ready(function () {
    $('select').material_select();
    $('.modal').modal();

    $('.change_status').on('click', function () {
        var ue = $(this).parent('form').find('input[name="user-exchange"]').val();
        var csrf = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            url: '/change_status/',
            type: 'post',
            cache: !1,
            dataType: 'html',
            data: {
                ue: ue,
                csrfmiddlewaretoken: csrf
            },
            success: function (data) {
                data === 'ok' ? location.reload() : Materialize.toast('Не удалось включить API');
            }
        });
        return false;
    });
    $('.api-incorrect').on('click', function () {
        Materialize.toast('Api Key/Secret is incorrect', 2000);
        return false;
    });
    $('#hidenull').on('click', function () {
        var hide = $(this).prop('checked');
        hide0balances(hide);
    });
    function hide0balances(hide) {
        if (hide) {
            for (var i = 0; i < $('.balance').length; i++) {
                var balance = $('.balance:eq(' + i + ')');
                if (parseFloat(balance.text().replace(",", ".")) == 0) {
                    balance.parent('tr').hide();
                }
            }
        } else {
            $('.balances').show();
        }
    }

    $('#wallet').find('select').on('change', function () {
        if ($(this).val() == 3) {
            $('#wallet').find('input#id_address').attr('disabled', true);
        } else {
            $('#wallet').find('input#id_address').attr('disabled', false);
        }
    });

    $('.fa-commenting').on('click', function () {
        $('#user_comment_modal').modal('open');
        $('input[name="tr_id"]').val($(this).attr('data-id'));
    });
    $('#comment-form').on('submit', function () {
        var f = $(this).serializeArray();
        $('i#trans' + f[1].value).parent('td').html(f[2].value);
        $.ajax({
            url: '/transaction/new_comment/',
            type: 'post',
            dataType: 'html',
            data: f,
            success: function (q) {
                if ('ok' === q) {
                    $('#user_comment_modal').modal('close');
                    $('#comment-form')[0].reset();
                    $('i#trans' + f[1].value).parent('td').html(f[2].value);
                } else if ('none' === q) {
                    Materialize.toast('Error while saving comment')
                }
            }
        });
        return false;
    });
    $('a.scrollto').on('click', function () {
        var name = $(this).attr('href').slice(1);
        $('.collapsible').collapsible('open', $('a[name="'+name+'"]').parent('li').index() - 1);
    });
});