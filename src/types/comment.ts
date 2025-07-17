export interface BaseComment {
  id: string
  author: string
  avatar?: string
  text: string
  time: Date
}

export interface Comment extends BaseComment {
  replies: Reply[]
}

export interface Reply extends BaseComment {}

export interface AddCommentParams {
  text: string
  author: string
  avatar?: string
}

export interface AddReplyParams {
  commentId: string
  reply: Omit<BaseComment, 'id' | 'time'>
}
