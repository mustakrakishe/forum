<div name="create-mode-content">

    <form
        name="store-comment-form"
        action="{{ route('topics.comments.store', ['topic' => $comment->topic_id, 'answerToId' => $comment->answer_to_id]) }}"
        method="post"
    >
        @csrf

        <div name="body" class="row m-0 my-2">
            <x-textarea name="text" class="text-justify" style="resize: none; min-height: 81px" autofocus></x-textarea>
        </div>

        <div name="footer" class="row m-0 justify-content-end">
            <x-button type="reset" class="btn-secondary mr-1">{{ __('actions.cancel') }}</x-button>
            <x-button>{{ __('actions.create') }}</x-button>
        </div>

    </form>

</div>