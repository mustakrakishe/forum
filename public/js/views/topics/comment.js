import Form from "../../components/form.js";
import * as Textarea from "../../components/textarea.js";

const TOPIC_COMMENTS_WRAPPER = "#topic-comments-wrapper";
const TOPIC_COMMENTS_CONTAINER = "#topic-comments-container"
const COMMENT_CREATE_FORMS = 'form[name=create-comment-form]';
const COMMENT_STORE_FORMS = 'form[name=store-comment-form]';
const COMMENT_EDIT_LINKS = 'a[name=edit-comment-link]';
const COMMENT_UPDATE_FORMS = 'form[name=update-comment-form]';
const COMMENT_SUB_TREES = '[name=comment-sub-tree]';
const COMMENT_CONTAINERS = '[name=comment-container]';
const COMMENT_CONTENT = '[name=content]';
const ANSWERS_CONTAINERS = '[name=answers-container]'
const COMMENT_SHOW_MODE_CONTENTS = '[name=show-mode-content]'
const COMMENT_EDIT_MODE_CONTENTS = '[name=edit-mode-content]'
const COMMENT_DELETE_MODAL = '#delete-comment-modal';
const COMMENT_DELETE_FORM = 'form#delete-comment-form';
const PAGINATOR = "#comment-paginator"
const PAGINATION_LINKS = 'a.page-link';

let commentToDeleteContainer = null;

$(document).on('submit', COMMENT_CREATE_FORMS, createCommentHandler);
$(document).on('submit', COMMENT_STORE_FORMS, storeCommentHandler);
$(document).on('reset', COMMENT_STORE_FORMS, cancelCommentCreateHandler);
$(document).on('click', COMMENT_EDIT_LINKS, editCommentHandler);
$(document).on('submit', COMMENT_UPDATE_FORMS, updateCommentHandler);
$(document).on('reset', COMMENT_UPDATE_FORMS, cancelEditCommentHandler);
$(document).on('show.bs.modal', COMMENT_DELETE_MODAL, fillDeleteCommentModal);
$(document).on('submit', COMMENT_DELETE_FORM, deleteCommentHandler);
$(document).on('click', PAGINATION_LINKS, showCommentsPage);

async function createCommentHandler(event){
    event.preventDefault();

    let form = event.target;
    let currentSubTree = $(form).closest(COMMENT_SUB_TREES);

    let creatingFormDestination = $(currentSubTree).find(ANSWERS_CONTAINERS).first();
    
    if($(creatingFormDestination).length == 0){
        creatingFormDestination = TOPIC_COMMENTS_CONTAINER;

        let firstPageUrl = $(PAGINATOR).attr('first-page-url');
        let response = await $.get(firstPageUrl);

        if(response.status === 1){
            let commentsFirstPage = response.view;
            $(TOPIC_COMMENTS_WRAPPER).html(commentsFirstPage);
        }
    }

    let response = await Form.xhrAction(form);
    
    if(response.status === 1){
        $(document).find(':focus').trigger('blur');
        $(creatingFormDestination).prepend(response.view);
    }
}

async function storeCommentHandler(event){
    event.preventDefault();

    let form = event.target;
    let hasValidation = true;

    let response = await Form.xhrAction(form, hasValidation);

    if(response.status === 1){
        let createdCommentSubTree = response.view;
        let currentCommentContainer = $(form).closest(COMMENT_CONTAINERS);
        $(currentCommentContainer).replaceWith(createdCommentSubTree);

        let rootComments = $(TOPIC_COMMENTS_CONTAINER).children(COMMENT_SUB_TREES);
        let perPage = $(PAGINATOR).attr('per-page');
        if(rootComments.length > perPage){
            $(rootComments).last().remove();
        }
    }
}

function cancelCommentCreateHandler(event) {
    $(event.target).closest(COMMENT_CONTAINERS).remove();
}

async function editCommentHandler(event){
    event.preventDefault();

    let link = event.target;
    let showModeContentContainer = $(link).closest(COMMENT_SHOW_MODE_CONTENTS);

    let response = await $.get({
        url: $(link).attr('href'),
    });
    
    if(response.status === 1){
        $(showModeContentContainer).attr('hidden', 'hidden');
        $(showModeContentContainer).after(response.view);
    }
}

async function updateCommentHandler(event){
    event.preventDefault();

    let form = event.target;
    let commentContentContainer = $(form).closest(COMMENT_CONTENT);
    let hasValidation = true;

    let response = await Form.xhrAction(form, hasValidation);

    if(response.status === 1){
        let showModeContent = response.view;

        $(commentContentContainer).find(COMMENT_EDIT_MODE_CONTENTS).first().remove();
        $(commentContentContainer).find(COMMENT_SHOW_MODE_CONTENTS).first().replaceWith(showModeContent);
    }
}

function cancelEditCommentHandler(event){
    let form = event.target;

    let commentContentContainer = $(form).closest(COMMENT_CONTENT);
    $(commentContentContainer).find(COMMENT_EDIT_MODE_CONTENTS).first().remove();
    $(commentContentContainer).find(COMMENT_SHOW_MODE_CONTENTS).first().removeAttr('hidden');

}

function fillDeleteCommentModal(event){
    let deleteButton = $(event.relatedTarget);
    let commentId = deleteButton.val();

    commentToDeleteContainer = $(deleteButton).closest(COMMENT_SUB_TREES);
    
    let oldUrl = $(COMMENT_DELETE_FORM).attr('action');
    let commentIdPos = oldUrl.lastIndexOf('/') + 1;
    let currentCommentDeleteUrl = oldUrl.slice(0, commentIdPos) + commentId;
    $(COMMENT_DELETE_FORM).attr('action', currentCommentDeleteUrl);
}

async function deleteCommentHandler(event){
    event.preventDefault();

    await Form.xhrAction(COMMENT_DELETE_FORM);

    $(commentToDeleteContainer).remove();

    $(COMMENT_DELETE_MODAL).modal('toggle');
}

async function showCommentsPage(event){
    event.preventDefault();
    
    let link = event.target;
    let url = $(link).attr('href');

    let response = await $.get(url);

    if(response.status === 1){
        let commentsNewPage = response.view;
        $(TOPIC_COMMENTS_WRAPPER).html(commentsNewPage);
    }
}