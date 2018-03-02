import $ from 'jquery';

$(document).ready(function() {
  $('body').on('click', '.js-editable', function() {

    const contentEditable = $(this);
    const text = contentEditable.find('.editable__text');
    const input = $('<input type="text"/>').val(text.text());
    const wrap = $("<div class='icons__wrap'></div>");

    contentEditable.addClass('edited').removeClass('js-editable');
    contentEditable.prepend(input);

    $(window).on('click', function(e) {
      if (contentEditable.has(e.target).length === 0 && !contentEditable.is(e.target)) {
        save();
      }
    });

    function inputChange() {
      const iconSave = $('<svg class="icon icon--save"><use xlink:href="img/sprite.svg#icon-ok"></use></svg>');
      const iconRevert = $('<svg class="icon icon--revert"><use xlink:href="img/sprite.svg#icon-remove"></use></svg>');
      iconSave.on('click', save);
      iconRevert.on('click', revert);
      if (wrap.find(iconSave).length === 0) {
        wrap.append(iconSave);
      }
      if (wrap.find(iconRevert).length === 0) {
        wrap.append(iconRevert);
      }
      if (contentEditable.find(wrap).length === 0) {
        contentEditable.append(wrap);
      }
    }

    function removeInput() {
      contentEditable.removeClass('edited').addClass('js-editable');
      wrap.remove();
      input.remove();
    }

    function save() {
      text.text(input.val());
      removeInput();
    }

    function revert() {
      removeInput();
    }

    contentEditable.one('keypress', inputChange);
  });

  $('body').on('click', '.js-add-skills', function() {
    const contentEditable = $(this);
    const button = contentEditable.find('.add-skills__btn');
    const input = $('<input type="text"/>').attr('placeholder', button.text());
    var icon = $('<div class="icons__wrap"><svg class="icon icon--save"><use xlink:href="img/sprite.svg#icon-ok"></use></svg></div>');

    contentEditable.toggleClass('js-add-skills js-add-skills--clicked');
    contentEditable.prepend(input);

    $(window).on('click', function(e) {
      if (contentEditable.has(e.target).length === 0 && !contentEditable.is(e.target)) {
        removeInput();
      }
    });

    function inputChange() {
      contentEditable.addClass('js-add-skills--edited');
      if (contentEditable.hasClass('js-add-skills--edited') && contentEditable.find(icon).length === 0) {
        contentEditable.append(icon);
      }
      contentEditable.append();
      $('.icon--save').on('click', saveSkill);
    }

    function saveSkill() {
      const skillLevel = $('.js-add-skills--edited option:selected').val();
      const newSkill = $(`<div class="skill skill--${skillLevel}"><span>${input.val()}</span><div class="remove-skill"><svg class="icon icon--remove"><use xlink:href="img/sprite.svg#icon-remove"></use></svg></div></div>`);
      newSkill.insertAfter($(`.skill--${skillLevel}`).last());
    }

    function removeInput() {
      contentEditable.addClass('js-add-skills').removeClass('js-add-skills--clicked js-add-skills--edited');
      input.remove();
      icon.remove();
    }

    contentEditable.one('keypress', inputChange);
  });

  $('.skill .remove-skill').on('click', function() {
    $(this).parent().remove();
  });

  $('.print-page').on('click', function() {
    window.print();
  });
});






