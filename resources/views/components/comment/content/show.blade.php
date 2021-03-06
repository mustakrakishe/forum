<div name="show-mode-content">

    <div name="header" class="d-flex m-0 text-muted small">
        <div>{{ __('Created at') }}: {{ $comment->created_at }}</div>

        <div class="ml-4">
            @isset($comment->updated_at)
            {{ __('Updated at') }}: {{ $comment->updated_at }}
            @endisset
        </div>

        @if($comment->author->is(Auth::user()))
        <div class="ml-auto">

            <div class="btn-group dropright mr-n4 mt-n1">
                <button type="button" class="py-0 btn shadow-none border-0 text-muted" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                
                <div class="dropdown-menu">
                    <a class="dropdown-item" name="edit-comment-link" href="{{ route('topics.comments.edit', ['topic' => $comment->topic_id, 'comment' => $comment->id]) }}">{{ __('actions.edit') }}</a>
                    <button class="dropdown-item" data-toggle="modal" data-target="#delete-comment-modal" value="{{ $comment->id }}">{{ __('actions.delete') }}</button>
                </div>
            </div>

        </div>
        @endif
    </div>

    <div name="body" class="row m-0 my-2">
        <p class="m-0 text-justify" style="white-space: break-spaces">{{ $comment->text }}</p>
    </div>

    @auth
    <div class="row m-0">
        <form name="create-comment-form" action="{{ route('topics.comments.create', ['topic' => $comment->topic_id, 'answerToId' => $comment->id]) }}">
            <x-button class="btn-link mb-n2 p-0 border-0">
                <p class="m-0 small">{{ __('actions.answer') }}</p>
            </x-button>
        </form>
    </div>
    @endauth

</div>