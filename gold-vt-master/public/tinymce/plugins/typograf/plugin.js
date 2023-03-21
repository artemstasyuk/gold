tinymce.PluginManager.add('typograf', function (editor, url) {
    'use strict';

    var scriptLoader = new tinymce.dom.ScriptLoader(),
        tp,
        typo = function () {
            if (tp) {
                var content = editor.getContent();
                content = tp.execute(content);
                content = content.replace(/<p> <\/p>/g, "");

                editor.setContent(content);
                editor.undoManager.add();

                var event = new CustomEvent('editorTextModClick', { 'detail': 'abc' });
                window.dispatchEvent(event);
            }
        };

    scriptLoader.add(url + '/typograf.min.js');

    scriptLoader.loadQueue(function () {
        Typograf.addRule({
            name: 'common/other/delAllDoubleSpace',
            handler: function (text) {
                return text.replace(/\s\s+/g, ' ');
            }
        });
        Typograf.addRule({
            name: 'common/other/addSpaceAfterDot',
            handler: function (text) {
                return text.replace(/(\.)(?=[А-Я])/g, '. ');
            }
        });

        tp = new Typograf({
            locale: 'ru',
            mode: 'name'
        });

        tp.enableRule('common/punctuation/quoteLink');
        tp.enableRule('common/space/trimLeft');
        tp.enableRule('ru/typo/switchingKeyboardLayout');
        tp.enableRule('common/space/delBeforePunctuation');
        tp.enableRule('common/space/delTrailingBlanks');
        tp.enableRule('common/space/delLeadingBlanks');
        tp.enableRule('common/space/delRepeatSpace');
        tp.enableRule('common/other/delAllDoubleSpace');
        tp.enableRule('common/space/afterPunctuation');
        tp.enableRule('common/other/addSpaceAfterDot');
        tp.enableRule('common/nbsp/replaceNbsp');
        tp.enableRule('ru/dash/centuries');

        tp.disableRule('ru/punctuation/ano');
        tp.disableRule('ru/dash/ka');
        tp.disableRule('ru/dash/koe');
        tp.disableRule('ru/nbsp/initials');
        tp.disableRule('ru/dash/decade');
        tp.disableRule('ru/money/currency');
        tp.disableRule('ru/nbsp/centuries');
        tp.disableRule('ru/nbsp/years');

    });

    editor.ui.registry.addButton('typograf', {
        text: '',
        icon: 'blockquote',
        onAction: typo
    });

    editor.ui.registry.addMenuItem('typograf', {
        context: 'format',
        text: 'Типографика',
        icon: 'blockquote',
        onAction: typo
    });
});