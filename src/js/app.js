import $ from 'jquery';

$(document).ready(function() {
  $('body').on('click', '.js-content-editable', function() {

    const contentEditable = $(this);
    const text = contentEditable.find('.content-editable__text');
    const input = $('<input type="text"/>').val(text.text());
    const wrap = $("<div class='input-icon-wrap'></div>");

    contentEditable.toggleClass('js-content-editable js-content-edited');
    contentEditable.prepend(input);

    function inputChange() {
      const iconSave = $('<svg class="icon icon-save"><use xlink:href="img/sprite.svg#icon-ok"></use></svg>');
      const iconRevert = $('<svg class="icon icon-revert"><use xlink:href="img/sprite.svg#icon-remove"></use></svg>');
      iconSave.on('click', save);
      iconRevert.on('click', revert);
      wrap.append(iconSave);
      wrap.append(iconRevert);
      contentEditable.append(wrap);
    }

    function removeInput() {
      contentEditable.toggleClass('js-content-editable js-content-edited');
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

    $('.js-content-edited input').one('keypress', inputChange);
  });

  $('body').on('click', '.js-add-skills', function() {
    const contentEditable = $(this);
    const button = contentEditable.find('.content-editable__button');
    const input = $('<input type="text"/>').attr('placeholder', button.text());

    contentEditable.toggleClass('js-add-skills js-add-skills-edited');
    contentEditable.prepend(input);

    function inputChange() {
      contentEditable.append('<div class="input-icon-wrap"><svg class="icon icon-save"><use xlink:href="img/sprite.svg#icon-ok"></use></svg></div>');
      $('.icon-save').on('click', save);
    }

    function save() {
      const skillLevel = $('.js-add-skills-edited option:selected').val();
      const newSkill = $(`<div class="skill skill--${skillLevel}"><span>${input.val()}</span><div class="remove-skill"><svg class="icon icon-remove"><use xlink:href="img/sprite.svg#icon-remove"></use></svg></div></div>`);
      newSkill.insertAfter($(`.skill--${skillLevel}`).last());
    }

    $('.js-add-skills-edited input').one('keypress', inputChange);
  });

  $('.skill .remove-skill').on('click', function() {
    $(this).parent().remove();
  });

  $('.print-page').on('click', function() {
    window.print();
  });
});






