import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ResolverContext } from '../resolvers/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddDiscoverFeedError = {
  __typename?: 'AddDiscoverFeedError';
  errorCodes: Array<AddDiscoverFeedErrorCode>;
};

export enum AddDiscoverFeedErrorCode {
  BadRequest = 'BAD_REQUEST',
  Conflict = 'CONFLICT',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type AddDiscoverFeedInput = {
  url: Scalars['String']['input'];
};

export type AddDiscoverFeedResult = AddDiscoverFeedError | AddDiscoverFeedSuccess;

export type AddDiscoverFeedSuccess = {
  __typename?: 'AddDiscoverFeedSuccess';
  feed: DiscoverFeed;
};

export type AddPopularReadError = {
  __typename?: 'AddPopularReadError';
  errorCodes: Array<AddPopularReadErrorCode>;
};

export enum AddPopularReadErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type AddPopularReadResult = AddPopularReadError | AddPopularReadSuccess;

export type AddPopularReadSuccess = {
  __typename?: 'AddPopularReadSuccess';
  pageId: Scalars['String']['output'];
};

export enum AllowedReply {
  Confirm = 'CONFIRM',
  Okay = 'OKAY',
  Subscribe = 'SUBSCRIBE',
  Yes = 'YES'
}

export type AnkiCardBatch = {
  __typename?: 'AnkiCardBatch';
  ankiNoteIds?: Maybe<Array<Scalars['String']['output']>>;
  cardCount: Scalars['Int']['output'];
  cardDetails?: Maybe<Array<AnkiCardDetail>>;
  createdAt: Scalars['Date']['output'];
  deck: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  libraryItemId: Scalars['ID']['output'];
  status: AnkiCardStatus;
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['ID']['output'];
};

export type AnkiCardBatchesError = {
  __typename?: 'AnkiCardBatchesError';
  errorCodes: Array<AnkiCardBatchesErrorCode>;
};

export enum AnkiCardBatchesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type AnkiCardBatchesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<AnkiCardStatus>;
};

export type AnkiCardBatchesResult = AnkiCardBatchesError | AnkiCardBatchesSuccess;

export type AnkiCardBatchesSuccess = {
  __typename?: 'AnkiCardBatchesSuccess';
  batches: Array<AnkiCardBatch>;
  pageInfo: PageInfo;
};

export type AnkiCardDetail = {
  __typename?: 'AnkiCardDetail';
  answer: Scalars['String']['output'];
  context?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
};

export enum AnkiCardStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  WaitingForTranslation = 'WAITING_FOR_TRANSLATION'
}

export type AnkiCardsError = {
  __typename?: 'AnkiCardsError';
  errorCodes: Array<AnkiCardsErrorCode>;
};

export enum AnkiCardsErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type AnkiCardsResult = AnkiCardsError | AnkiCardsSuccess;

export type AnkiCardsSuccess = {
  __typename?: 'AnkiCardsSuccess';
  batch?: Maybe<AnkiCardBatch>;
};

export type AnkiIntegrationError = {
  __typename?: 'AnkiIntegrationError';
  errorCodes: Array<AnkiIntegrationErrorCode>;
};

export enum AnkiIntegrationErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type AnkiIntegrationResult = AnkiIntegrationError | AnkiIntegrationSuccess;

export type AnkiIntegrationSuccess = {
  __typename?: 'AnkiIntegrationSuccess';
  integration?: Maybe<Integration>;
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: Scalars['Date']['output'];
  expiresAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  scopes?: Maybe<Array<Scalars['String']['output']>>;
  usedAt?: Maybe<Scalars['Date']['output']>;
};

export type ApiKeysError = {
  __typename?: 'ApiKeysError';
  errorCodes: Array<ApiKeysErrorCode>;
};

export enum ApiKeysErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ApiKeysResult = ApiKeysError | ApiKeysSuccess;

export type ApiKeysSuccess = {
  __typename?: 'ApiKeysSuccess';
  apiKeys: Array<ApiKey>;
};

export type ArchiveLinkError = {
  __typename?: 'ArchiveLinkError';
  errorCodes: Array<ArchiveLinkErrorCode>;
  message: Scalars['String']['output'];
};

export enum ArchiveLinkErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArchiveLinkInput = {
  archived: Scalars['Boolean']['input'];
  linkId: Scalars['ID']['input'];
};

export type ArchiveLinkResult = ArchiveLinkError | ArchiveLinkSuccess;

export type ArchiveLinkSuccess = {
  __typename?: 'ArchiveLinkSuccess';
  linkId: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  contentReader: ContentReader;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  directionality?: Maybe<DirectionalityType>;
  feedContent?: Maybe<Scalars['String']['output']>;
  folder: Scalars['String']['output'];
  hasContent?: Maybe<Scalars['Boolean']['output']>;
  hash: Scalars['String']['output'];
  highlights: Array<Highlight>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isArchived: Scalars['Boolean']['output'];
  labels?: Maybe<Array<Label>>;
  language?: Maybe<Scalars['String']['output']>;
  linkId?: Maybe<Scalars['ID']['output']>;
  originalArticleUrl?: Maybe<Scalars['String']['output']>;
  originalHtml?: Maybe<Scalars['String']['output']>;
  pageType?: Maybe<PageType>;
  postedByViewer?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['Date']['output']>;
  readAt?: Maybe<Scalars['Date']['output']>;
  readingProgressAnchorIndex: Scalars['Int']['output'];
  readingProgressPercent: Scalars['Float']['output'];
  readingProgressTopPercent?: Maybe<Scalars['Float']['output']>;
  recommendations?: Maybe<Array<Recommendation>>;
  savedAt: Scalars['Date']['output'];
  savedByViewer?: Maybe<Scalars['Boolean']['output']>;
  shareInfo?: Maybe<LinkShareInfo>;
  sharedComment?: Maybe<Scalars['String']['output']>;
  showTranslated: Scalars['Boolean']['output'];
  siteIcon?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  state?: Maybe<ArticleSavingRequestStatus>;
  subscription?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  translatedContent?: Maybe<Scalars['String']['output']>;
  translatedLanguage?: Maybe<Scalars['String']['output']>;
  translationStatus?: Maybe<TranslationStatus>;
  unsubHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  url: Scalars['String']['output'];
  wordsCount?: Maybe<Scalars['Int']['output']>;
};


export type ArticleHighlightsArgs = {
  input?: InputMaybe<ArticleHighlightsInput>;
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String']['output'];
  node: Article;
};

export type ArticleError = {
  __typename?: 'ArticleError';
  errorCodes: Array<ArticleErrorCode>;
};

export enum ArticleErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticleHighlightsInput = {
  includeFriends?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArticleResult = ArticleError | ArticleSuccess;

export type ArticleSavingRequest = {
  __typename?: 'ArticleSavingRequest';
  /** @deprecated article has been replaced with slug */
  article?: Maybe<Article>;
  createdAt: Scalars['Date']['output'];
  errorCode?: Maybe<CreateArticleErrorCode>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  status: ArticleSavingRequestStatus;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
  user: User;
  /** @deprecated userId has been replaced with user */
  userId: Scalars['ID']['output'];
};

export type ArticleSavingRequestError = {
  __typename?: 'ArticleSavingRequestError';
  errorCodes: Array<ArticleSavingRequestErrorCode>;
};

export enum ArticleSavingRequestErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticleSavingRequestResult = ArticleSavingRequestError | ArticleSavingRequestSuccess;

export enum ArticleSavingRequestStatus {
  Archived = 'ARCHIVED',
  ContentNotFetched = 'CONTENT_NOT_FETCHED',
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Succeeded = 'SUCCEEDED'
}

export type ArticleSavingRequestSuccess = {
  __typename?: 'ArticleSavingRequestSuccess';
  articleSavingRequest: ArticleSavingRequest;
};

export type ArticleSuccess = {
  __typename?: 'ArticleSuccess';
  article: Article;
};

export type ArticlesError = {
  __typename?: 'ArticlesError';
  errorCodes: Array<ArticlesErrorCode>;
};

export enum ArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticlesResult = ArticlesError | ArticlesSuccess;

export type ArticlesSuccess = {
  __typename?: 'ArticlesSuccess';
  edges: Array<ArticleEdge>;
  pageInfo: PageInfo;
};

export type BulkActionError = {
  __typename?: 'BulkActionError';
  errorCodes: Array<BulkActionErrorCode>;
};

export enum BulkActionErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type BulkActionResult = BulkActionError | BulkActionSuccess;

export type BulkActionSuccess = {
  __typename?: 'BulkActionSuccess';
  success: Scalars['Boolean']['output'];
};

export enum BulkActionType {
  AddLabels = 'ADD_LABELS',
  Archive = 'ARCHIVE',
  Delete = 'DELETE',
  MarkAsRead = 'MARK_AS_READ',
  MarkAsSeen = 'MARK_AS_SEEN',
  MoveToFolder = 'MOVE_TO_FOLDER'
}

export enum ContentReader {
  Epub = 'EPUB',
  Pdf = 'PDF',
  Web = 'WEB'
}

export type CreateArticleError = {
  __typename?: 'CreateArticleError';
  errorCodes: Array<CreateArticleErrorCode>;
};

export enum CreateArticleErrorCode {
  ElasticError = 'ELASTIC_ERROR',
  NotAllowedToParse = 'NOT_ALLOWED_TO_PARSE',
  PayloadTooLarge = 'PAYLOAD_TOO_LARGE',
  UnableToFetch = 'UNABLE_TO_FETCH',
  UnableToParse = 'UNABLE_TO_PARSE',
  Unauthorized = 'UNAUTHORIZED',
  UploadFileMissing = 'UPLOAD_FILE_MISSING'
}

export type CreateArticleInput = {
  articleSavingRequestId?: InputMaybe<Scalars['ID']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  preparedDocument?: InputMaybe<PreparedDocumentInput>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  rssFeedUrl?: InputMaybe<Scalars['String']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  skipParsing?: InputMaybe<Scalars['Boolean']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ArticleSavingRequestStatus>;
  uploadFileId?: InputMaybe<Scalars['ID']['input']>;
  url: Scalars['String']['input'];
};

export type CreateArticleResult = CreateArticleError | CreateArticleSuccess;

export type CreateArticleSavingRequestError = {
  __typename?: 'CreateArticleSavingRequestError';
  errorCodes: Array<CreateArticleSavingRequestErrorCode>;
};

export enum CreateArticleSavingRequestErrorCode {
  BadData = 'BAD_DATA',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateArticleSavingRequestInput = {
  url: Scalars['String']['input'];
};

export type CreateArticleSavingRequestResult = CreateArticleSavingRequestError | CreateArticleSavingRequestSuccess;

export type CreateArticleSavingRequestSuccess = {
  __typename?: 'CreateArticleSavingRequestSuccess';
  articleSavingRequest: ArticleSavingRequest;
};

export type CreateArticleSuccess = {
  __typename?: 'CreateArticleSuccess';
  created: Scalars['Boolean']['output'];
  createdArticle: Article;
  user: User;
};

export type CreateFolderPolicyError = {
  __typename?: 'CreateFolderPolicyError';
  errorCodes: Array<CreateFolderPolicyErrorCode>;
};

export enum CreateFolderPolicyErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateFolderPolicyInput = {
  action: FolderPolicyAction;
  afterDays: Scalars['Int']['input'];
  folder: Scalars['String']['input'];
};

export type CreateFolderPolicyResult = CreateFolderPolicyError | CreateFolderPolicySuccess;

export type CreateFolderPolicySuccess = {
  __typename?: 'CreateFolderPolicySuccess';
  policy: FolderPolicy;
};

export type CreateGroupError = {
  __typename?: 'CreateGroupError';
  errorCodes: Array<CreateGroupErrorCode>;
};

export enum CreateGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  maxMembers?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  onlyAdminCanPost?: InputMaybe<Scalars['Boolean']['input']>;
  onlyAdminCanSeeMembers?: InputMaybe<Scalars['Boolean']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateGroupResult = CreateGroupError | CreateGroupSuccess;

export type CreateGroupSuccess = {
  __typename?: 'CreateGroupSuccess';
  group: RecommendationGroup;
};

export type CreateHighlightError = {
  __typename?: 'CreateHighlightError';
  errorCodes: Array<CreateHighlightErrorCode>;
};

export enum CreateHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  articleId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  highlightPositionAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  highlightPositionPercent?: InputMaybe<Scalars['Float']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  patch?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  quote?: InputMaybe<Scalars['String']['input']>;
  representation?: InputMaybe<RepresentationType>;
  sharedAt?: InputMaybe<Scalars['Date']['input']>;
  shortId: Scalars['String']['input'];
  suffix?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<HighlightType>;
};

export type CreateHighlightReplyError = {
  __typename?: 'CreateHighlightReplyError';
  errorCodes: Array<CreateHighlightReplyErrorCode>;
};

export enum CreateHighlightReplyErrorCode {
  EmptyAnnotation = 'EMPTY_ANNOTATION',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateHighlightReplyInput = {
  highlightId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateHighlightReplyResult = CreateHighlightReplyError | CreateHighlightReplySuccess;

export type CreateHighlightReplySuccess = {
  __typename?: 'CreateHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type CreateHighlightResult = CreateHighlightError | CreateHighlightSuccess;

export type CreateHighlightSuccess = {
  __typename?: 'CreateHighlightSuccess';
  highlight: Highlight;
};

export type CreateLabelError = {
  __typename?: 'CreateLabelError';
  errorCodes: Array<CreateLabelErrorCode>;
};

export enum CreateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  LabelAlreadyExists = 'LABEL_ALREADY_EXISTS',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateLabelResult = CreateLabelError | CreateLabelSuccess;

export type CreateLabelSuccess = {
  __typename?: 'CreateLabelSuccess';
  label: Label;
};

export type CreateNewsletterEmailError = {
  __typename?: 'CreateNewsletterEmailError';
  errorCodes: Array<CreateNewsletterEmailErrorCode>;
};

export enum CreateNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateNewsletterEmailInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNewsletterEmailResult = CreateNewsletterEmailError | CreateNewsletterEmailSuccess;

export type CreateNewsletterEmailSuccess = {
  __typename?: 'CreateNewsletterEmailSuccess';
  newsletterEmail: NewsletterEmail;
};

export type CreatePostError = {
  __typename?: 'CreatePostError';
  errorCodes: Array<CreatePostErrorCode>;
};

export enum CreatePostErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreatePostInput = {
  content: Scalars['String']['input'];
  highlightIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  libraryItemIds: Array<Scalars['ID']['input']>;
  thought?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostResult = CreatePostError | CreatePostSuccess;

export type CreatePostSuccess = {
  __typename?: 'CreatePostSuccess';
  post: Post;
};

export type CreateReactionError = {
  __typename?: 'CreateReactionError';
  errorCodes: Array<CreateReactionErrorCode>;
};

export enum CreateReactionErrorCode {
  BadCode = 'BAD_CODE',
  BadTarget = 'BAD_TARGET',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateReactionInput = {
  code: ReactionType;
  highlightId?: InputMaybe<Scalars['ID']['input']>;
  userArticleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReactionResult = CreateReactionError | CreateReactionSuccess;

export type CreateReactionSuccess = {
  __typename?: 'CreateReactionSuccess';
  reaction: Reaction;
};

export type CreateReminderError = {
  __typename?: 'CreateReminderError';
  errorCodes: Array<CreateReminderErrorCode>;
};

export enum CreateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateReminderInput = {
  archiveUntil: Scalars['Boolean']['input'];
  clientRequestId?: InputMaybe<Scalars['ID']['input']>;
  linkId?: InputMaybe<Scalars['ID']['input']>;
  remindAt: Scalars['Date']['input'];
  sendNotification: Scalars['Boolean']['input'];
};

export type CreateReminderResult = CreateReminderError | CreateReminderSuccess;

export type CreateReminderSuccess = {
  __typename?: 'CreateReminderSuccess';
  reminder: Reminder;
};

export type DeleteAccountError = {
  __typename?: 'DeleteAccountError';
  errorCodes: Array<DeleteAccountErrorCode>;
};

export enum DeleteAccountErrorCode {
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type DeleteAccountResult = DeleteAccountError | DeleteAccountSuccess;

export type DeleteAccountSuccess = {
  __typename?: 'DeleteAccountSuccess';
  userID: Scalars['ID']['output'];
};

export type DeleteDiscoverArticleError = {
  __typename?: 'DeleteDiscoverArticleError';
  errorCodes: Array<DeleteDiscoverArticleErrorCode>;
};

export enum DeleteDiscoverArticleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteDiscoverArticleInput = {
  discoverArticleId: Scalars['ID']['input'];
};

export type DeleteDiscoverArticleResult = DeleteDiscoverArticleError | DeleteDiscoverArticleSuccess;

export type DeleteDiscoverArticleSuccess = {
  __typename?: 'DeleteDiscoverArticleSuccess';
  id: Scalars['ID']['output'];
};

export type DeleteDiscoverFeedError = {
  __typename?: 'DeleteDiscoverFeedError';
  errorCodes: Array<DeleteDiscoverFeedErrorCode>;
};

export enum DeleteDiscoverFeedErrorCode {
  BadRequest = 'BAD_REQUEST',
  Conflict = 'CONFLICT',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteDiscoverFeedInput = {
  feedId: Scalars['ID']['input'];
};

export type DeleteDiscoverFeedResult = DeleteDiscoverFeedError | DeleteDiscoverFeedSuccess;

export type DeleteDiscoverFeedSuccess = {
  __typename?: 'DeleteDiscoverFeedSuccess';
  id: Scalars['String']['output'];
};

export type DeleteFilterError = {
  __typename?: 'DeleteFilterError';
  errorCodes: Array<DeleteFilterErrorCode>;
};

export enum DeleteFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteFilterResult = DeleteFilterError | DeleteFilterSuccess;

export type DeleteFilterSuccess = {
  __typename?: 'DeleteFilterSuccess';
  filter: Filter;
};

export type DeleteFolderPolicyError = {
  __typename?: 'DeleteFolderPolicyError';
  errorCodes: Array<DeleteFolderPolicyErrorCode>;
};

export enum DeleteFolderPolicyErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteFolderPolicyResult = DeleteFolderPolicyError | DeleteFolderPolicySuccess;

export type DeleteFolderPolicySuccess = {
  __typename?: 'DeleteFolderPolicySuccess';
  success: Scalars['Boolean']['output'];
};

export type DeleteHighlightError = {
  __typename?: 'DeleteHighlightError';
  errorCodes: Array<DeleteHighlightErrorCode>;
};

export enum DeleteHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteHighlightReplyError = {
  __typename?: 'DeleteHighlightReplyError';
  errorCodes: Array<DeleteHighlightReplyErrorCode>;
};

export enum DeleteHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteHighlightReplyResult = DeleteHighlightReplyError | DeleteHighlightReplySuccess;

export type DeleteHighlightReplySuccess = {
  __typename?: 'DeleteHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type DeleteHighlightResult = DeleteHighlightError | DeleteHighlightSuccess;

export type DeleteHighlightSuccess = {
  __typename?: 'DeleteHighlightSuccess';
  highlight: Highlight;
};

export type DeleteIntegrationError = {
  __typename?: 'DeleteIntegrationError';
  errorCodes: Array<DeleteIntegrationErrorCode>;
};

export enum DeleteIntegrationErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteIntegrationResult = DeleteIntegrationError | DeleteIntegrationSuccess;

export type DeleteIntegrationSuccess = {
  __typename?: 'DeleteIntegrationSuccess';
  integration: Integration;
};

export type DeleteLabelError = {
  __typename?: 'DeleteLabelError';
  errorCodes: Array<DeleteLabelErrorCode>;
};

export enum DeleteLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteLabelResult = DeleteLabelError | DeleteLabelSuccess;

export type DeleteLabelSuccess = {
  __typename?: 'DeleteLabelSuccess';
  label: Label;
};

export type DeleteNewsletterEmailError = {
  __typename?: 'DeleteNewsletterEmailError';
  errorCodes: Array<DeleteNewsletterEmailErrorCode>;
};

export enum DeleteNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteNewsletterEmailResult = DeleteNewsletterEmailError | DeleteNewsletterEmailSuccess;

export type DeleteNewsletterEmailSuccess = {
  __typename?: 'DeleteNewsletterEmailSuccess';
  newsletterEmail: NewsletterEmail;
};

export type DeletePostError = {
  __typename?: 'DeletePostError';
  errorCodes: Array<DeletePostErrorCode>;
};

export enum DeletePostErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeletePostResult = DeletePostError | DeletePostSuccess;

export type DeletePostSuccess = {
  __typename?: 'DeletePostSuccess';
  success: Scalars['Boolean']['output'];
};

export type DeleteReactionError = {
  __typename?: 'DeleteReactionError';
  errorCodes: Array<DeleteReactionErrorCode>;
};

export enum DeleteReactionErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteReactionResult = DeleteReactionError | DeleteReactionSuccess;

export type DeleteReactionSuccess = {
  __typename?: 'DeleteReactionSuccess';
  reaction: Reaction;
};

export type DeleteReminderError = {
  __typename?: 'DeleteReminderError';
  errorCodes: Array<DeleteReminderErrorCode>;
};

export enum DeleteReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteReminderResult = DeleteReminderError | DeleteReminderSuccess;

export type DeleteReminderSuccess = {
  __typename?: 'DeleteReminderSuccess';
  reminder: Reminder;
};

export type DeleteRuleError = {
  __typename?: 'DeleteRuleError';
  errorCodes: Array<DeleteRuleErrorCode>;
};

export enum DeleteRuleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteRuleResult = DeleteRuleError | DeleteRuleSuccess;

export type DeleteRuleSuccess = {
  __typename?: 'DeleteRuleSuccess';
  rule: Rule;
};

export type DeleteWebhookError = {
  __typename?: 'DeleteWebhookError';
  errorCodes: Array<DeleteWebhookErrorCode>;
};

export enum DeleteWebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteWebhookResult = DeleteWebhookError | DeleteWebhookSuccess;

export type DeleteWebhookSuccess = {
  __typename?: 'DeleteWebhookSuccess';
  webhook: Webhook;
};

export type DeviceToken = {
  __typename?: 'DeviceToken';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type DeviceTokensError = {
  __typename?: 'DeviceTokensError';
  errorCodes: Array<DeviceTokensErrorCode>;
};

export enum DeviceTokensErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeviceTokensResult = DeviceTokensError | DeviceTokensSuccess;

export type DeviceTokensSuccess = {
  __typename?: 'DeviceTokensSuccess';
  deviceTokens: Array<DeviceToken>;
};

export type DigestConfig = {
  __typename?: 'DigestConfig';
  channels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type DigestConfigInput = {
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum DirectionalityType {
  Ltr = 'LTR',
  Rtl = 'RTL'
}

export type DiscoverFeed = {
  __typename?: 'DiscoverFeed';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  visibleName?: Maybe<Scalars['String']['output']>;
};

export type DiscoverFeedArticle = {
  __typename?: 'DiscoverFeedArticle';
  author?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  feed: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  publishedDate?: Maybe<Scalars['Date']['output']>;
  savedId?: Maybe<Scalars['String']['output']>;
  savedLinkUrl?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DiscoverFeedError = {
  __typename?: 'DiscoverFeedError';
  errorCodes: Array<DiscoverFeedErrorCode>;
};

export enum DiscoverFeedErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type DiscoverFeedResult = DiscoverFeedError | DiscoverFeedSuccess;

export type DiscoverFeedSuccess = {
  __typename?: 'DiscoverFeedSuccess';
  feeds: Array<Maybe<DiscoverFeed>>;
};

export type DiscoverTopic = {
  __typename?: 'DiscoverTopic';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EditDiscoverFeedError = {
  __typename?: 'EditDiscoverFeedError';
  errorCodes: Array<EditDiscoverFeedErrorCode>;
};

export enum EditDiscoverFeedErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type EditDiscoverFeedInput = {
  feedId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type EditDiscoverFeedResult = EditDiscoverFeedError | EditDiscoverFeedSuccess;

export type EditDiscoverFeedSuccess = {
  __typename?: 'EditDiscoverFeedSuccess';
  id: Scalars['ID']['output'];
};

export type EmptyTrashError = {
  __typename?: 'EmptyTrashError';
  errorCodes: Array<EmptyTrashErrorCode>;
};

export enum EmptyTrashErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type EmptyTrashResult = EmptyTrashError | EmptyTrashSuccess;

export type EmptyTrashSuccess = {
  __typename?: 'EmptyTrashSuccess';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export enum ErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ExportToIntegrationError = {
  __typename?: 'ExportToIntegrationError';
  errorCodes: Array<ExportToIntegrationErrorCode>;
};

export enum ExportToIntegrationErrorCode {
  FailedToCreateTask = 'FAILED_TO_CREATE_TASK',
  Unauthorized = 'UNAUTHORIZED'
}

export type ExportToIntegrationResult = ExportToIntegrationError | ExportToIntegrationSuccess;

export type ExportToIntegrationSuccess = {
  __typename?: 'ExportToIntegrationSuccess';
  task: Task;
};

export type Feature = {
  __typename?: 'Feature';
  createdAt: Scalars['Date']['output'];
  expiresAt?: Maybe<Scalars['Date']['output']>;
  grantedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Feed = {
  __typename?: 'Feed';
  author?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['Date']['output']>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type FeedArticle = {
  __typename?: 'FeedArticle';
  annotationsCount?: Maybe<Scalars['Int']['output']>;
  article: Article;
  highlight?: Maybe<Highlight>;
  highlightsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  reactions: Array<Reaction>;
  sharedAt: Scalars['Date']['output'];
  sharedBy: User;
  sharedComment?: Maybe<Scalars['String']['output']>;
  sharedWithHighlights?: Maybe<Scalars['Boolean']['output']>;
};

export type FeedArticleEdge = {
  __typename?: 'FeedArticleEdge';
  cursor: Scalars['String']['output'];
  node: FeedArticle;
};

export type FeedArticlesError = {
  __typename?: 'FeedArticlesError';
  errorCodes: Array<FeedArticlesErrorCode>;
};

export enum FeedArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type FeedArticlesResult = FeedArticlesError | FeedArticlesSuccess;

export type FeedArticlesSuccess = {
  __typename?: 'FeedArticlesSuccess';
  edges: Array<FeedArticleEdge>;
  pageInfo: PageInfo;
};

export type FeedEdge = {
  __typename?: 'FeedEdge';
  cursor: Scalars['String']['output'];
  node: Feed;
};

export type FeedsError = {
  __typename?: 'FeedsError';
  errorCodes: Array<FeedsErrorCode>;
};

export enum FeedsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type FeedsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortParams>;
};

export type FeedsResult = FeedsError | FeedsSuccess;

export type FeedsSuccess = {
  __typename?: 'FeedsSuccess';
  edges: Array<FeedEdge>;
  pageInfo: PageInfo;
};

export type FetchContentError = {
  __typename?: 'FetchContentError';
  errorCodes: Array<FetchContentErrorCode>;
};

export enum FetchContentErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type FetchContentResult = FetchContentError | FetchContentSuccess;

export type FetchContentSuccess = {
  __typename?: 'FetchContentSuccess';
  success: Scalars['Boolean']['output'];
};

export enum FetchContentType {
  Always = 'ALWAYS',
  Never = 'NEVER',
  WhenEmpty = 'WHEN_EMPTY'
}

export type Filter = {
  __typename?: 'Filter';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  defaultFilter?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  filter: Scalars['String']['output'];
  folder?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type FiltersError = {
  __typename?: 'FiltersError';
  errorCodes: Array<FiltersErrorCode>;
};

export enum FiltersErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type FiltersResult = FiltersError | FiltersSuccess;

export type FiltersSuccess = {
  __typename?: 'FiltersSuccess';
  filters: Array<Filter>;
};

export type FolderPoliciesError = {
  __typename?: 'FolderPoliciesError';
  errorCodes: Array<FolderPoliciesErrorCode>;
};

export enum FolderPoliciesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type FolderPoliciesResult = FolderPoliciesError | FolderPoliciesSuccess;

export type FolderPoliciesSuccess = {
  __typename?: 'FolderPoliciesSuccess';
  policies: Array<FolderPolicy>;
};

export type FolderPolicy = {
  __typename?: 'FolderPolicy';
  action: FolderPolicyAction;
  afterDays: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  folder: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum FolderPolicyAction {
  Archive = 'ARCHIVE',
  Delete = 'DELETE'
}

export type GenerateAnkiCardsBatchError = {
  __typename?: 'GenerateAnkiCardsBatchError';
  errorCodes: Array<GenerateAnkiCardsBatchErrorCode>;
};

export enum GenerateAnkiCardsBatchErrorCode {
  BadRequest = 'BAD_REQUEST',
  IntegrationNotConfigured = 'INTEGRATION_NOT_CONFIGURED',
  Unauthorized = 'UNAUTHORIZED'
}

export type GenerateAnkiCardsBatchInput = {
  libraryItemIds: Array<Scalars['ID']['input']>;
};

export type GenerateAnkiCardsBatchResult = GenerateAnkiCardsBatchError | GenerateAnkiCardsBatchSuccess;

export type GenerateAnkiCardsBatchSuccess = {
  __typename?: 'GenerateAnkiCardsBatchSuccess';
  jobsEnqueued: Scalars['Int']['output'];
};

export type GenerateAnkiCardsError = {
  __typename?: 'GenerateAnkiCardsError';
  errorCodes: Array<GenerateAnkiCardsErrorCode>;
};

export enum GenerateAnkiCardsErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  FailedToEnqueue = 'FAILED_TO_ENQUEUE',
  IntegrationNotConfigured = 'INTEGRATION_NOT_CONFIGURED',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type GenerateAnkiCardsResult = GenerateAnkiCardsError | GenerateAnkiCardsSuccess;

export type GenerateAnkiCardsSuccess = {
  __typename?: 'GenerateAnkiCardsSuccess';
  batch: AnkiCardBatch;
};

export type GenerateApiKeyError = {
  __typename?: 'GenerateApiKeyError';
  errorCodes: Array<GenerateApiKeyErrorCode>;
};

export enum GenerateApiKeyErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type GenerateApiKeyInput = {
  expiresAt: Scalars['Date']['input'];
  name: Scalars['String']['input'];
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GenerateApiKeyResult = GenerateApiKeyError | GenerateApiKeySuccess;

export type GenerateApiKeySuccess = {
  __typename?: 'GenerateApiKeySuccess';
  apiKey: ApiKey;
};

export type GetDiscoverFeedArticleError = {
  __typename?: 'GetDiscoverFeedArticleError';
  errorCodes: Array<GetDiscoverFeedArticleErrorCode>;
};

export enum GetDiscoverFeedArticleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type GetDiscoverFeedArticleResults = GetDiscoverFeedArticleError | GetDiscoverFeedArticleSuccess;

export type GetDiscoverFeedArticleSuccess = {
  __typename?: 'GetDiscoverFeedArticleSuccess';
  discoverArticles?: Maybe<Array<Maybe<DiscoverFeedArticle>>>;
  pageInfo: PageInfo;
};

export type GetDiscoverTopicError = {
  __typename?: 'GetDiscoverTopicError';
  errorCodes: Array<GetDiscoverTopicErrorCode>;
};

export enum GetDiscoverTopicErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetDiscoverTopicResults = GetDiscoverTopicError | GetDiscoverTopicSuccess;

export type GetDiscoverTopicSuccess = {
  __typename?: 'GetDiscoverTopicSuccess';
  discoverTopics?: Maybe<Array<DiscoverTopic>>;
};

export type GetFollowersError = {
  __typename?: 'GetFollowersError';
  errorCodes: Array<GetFollowersErrorCode>;
};

export enum GetFollowersErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetFollowersResult = GetFollowersError | GetFollowersSuccess;

export type GetFollowersSuccess = {
  __typename?: 'GetFollowersSuccess';
  followers: Array<User>;
};

export type GetFollowingError = {
  __typename?: 'GetFollowingError';
  errorCodes: Array<GetFollowingErrorCode>;
};

export enum GetFollowingErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetFollowingResult = GetFollowingError | GetFollowingSuccess;

export type GetFollowingSuccess = {
  __typename?: 'GetFollowingSuccess';
  following: Array<User>;
};

export type GetUserPersonalizationError = {
  __typename?: 'GetUserPersonalizationError';
  errorCodes: Array<GetUserPersonalizationErrorCode>;
};

export enum GetUserPersonalizationErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetUserPersonalizationResult = GetUserPersonalizationError | GetUserPersonalizationSuccess;

export type GetUserPersonalizationSuccess = {
  __typename?: 'GetUserPersonalizationSuccess';
  userPersonalization?: Maybe<UserPersonalization>;
};

export type GoogleLoginInput = {
  email: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type GoogleSignupError = {
  __typename?: 'GoogleSignupError';
  errorCodes: Array<Maybe<SignupErrorCode>>;
};

export type GoogleSignupInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  pictureUrl: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  sourceUserId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GoogleSignupResult = GoogleSignupError | GoogleSignupSuccess;

export type GoogleSignupSuccess = {
  __typename?: 'GoogleSignupSuccess';
  me: User;
};

export type GroupsError = {
  __typename?: 'GroupsError';
  errorCodes: Array<GroupsErrorCode>;
};

export enum GroupsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type GroupsResult = GroupsError | GroupsSuccess;

export type GroupsSuccess = {
  __typename?: 'GroupsSuccess';
  groups: Array<RecommendationGroup>;
};

export type HiddenHomeSectionError = {
  __typename?: 'HiddenHomeSectionError';
  errorCodes: Array<HiddenHomeSectionErrorCode>;
};

export enum HiddenHomeSectionErrorCode {
  BadRequest = 'BAD_REQUEST',
  Pending = 'PENDING',
  Unauthorized = 'UNAUTHORIZED'
}

export type HiddenHomeSectionResult = HiddenHomeSectionError | HiddenHomeSectionSuccess;

export type HiddenHomeSectionSuccess = {
  __typename?: 'HiddenHomeSectionSuccess';
  section?: Maybe<HomeSection>;
};

export type Highlight = {
  __typename?: 'Highlight';
  annotation?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdByMe: Scalars['Boolean']['output'];
  highlightPositionAnchorIndex?: Maybe<Scalars['Int']['output']>;
  highlightPositionPercent?: Maybe<Scalars['Float']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  labels?: Maybe<Array<Label>>;
  libraryItem: Article;
  patch?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  reactions: Array<Reaction>;
  replies: Array<HighlightReply>;
  representation: RepresentationType;
  sharedAt?: Maybe<Scalars['Date']['output']>;
  shortId: Scalars['String']['output'];
  suffix?: Maybe<Scalars['String']['output']>;
  type: HighlightType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type HighlightEdge = {
  __typename?: 'HighlightEdge';
  cursor: Scalars['String']['output'];
  node: Highlight;
};

export type HighlightReply = {
  __typename?: 'HighlightReply';
  createdAt: Scalars['Date']['output'];
  highlight: Highlight;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type HighlightStats = {
  __typename?: 'HighlightStats';
  highlightCount: Scalars['Int']['output'];
};

export enum HighlightType {
  Highlight = 'HIGHLIGHT',
  Note = 'NOTE',
  Redaction = 'REDACTION'
}

export type HighlightsError = {
  __typename?: 'HighlightsError';
  errorCodes: Array<HighlightsErrorCode>;
};

export enum HighlightsErrorCode {
  BadRequest = 'BAD_REQUEST'
}

export type HighlightsResult = HighlightsError | HighlightsSuccess;

export type HighlightsSuccess = {
  __typename?: 'HighlightsSuccess';
  edges: Array<HighlightEdge>;
  pageInfo: PageInfo;
};

export type HomeEdge = {
  __typename?: 'HomeEdge';
  cursor: Scalars['String']['output'];
  node: HomeSection;
};

export type HomeError = {
  __typename?: 'HomeError';
  errorCodes: Array<HomeErrorCode>;
};

export enum HomeErrorCode {
  BadRequest = 'BAD_REQUEST',
  Pending = 'PENDING',
  Unauthorized = 'UNAUTHORIZED'
}

export type HomeItem = {
  __typename?: 'HomeItem';
  author?: Maybe<Scalars['String']['output']>;
  broadcastCount?: Maybe<Scalars['Int']['output']>;
  canArchive?: Maybe<Scalars['Boolean']['output']>;
  canComment?: Maybe<Scalars['Boolean']['output']>;
  canDelete?: Maybe<Scalars['Boolean']['output']>;
  canMove?: Maybe<Scalars['Boolean']['output']>;
  canSave?: Maybe<Scalars['Boolean']['output']>;
  canShare?: Maybe<Scalars['Boolean']['output']>;
  date: Scalars['Date']['output'];
  dir?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  previewContent?: Maybe<Scalars['String']['output']>;
  saveCount?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  seen_at?: Maybe<Scalars['Date']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  source?: Maybe<HomeItemSource>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  wordCount?: Maybe<Scalars['Int']['output']>;
};

export type HomeItemSource = {
  __typename?: 'HomeItemSource';
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type: HomeItemSourceType;
  url?: Maybe<Scalars['String']['output']>;
};

export enum HomeItemSourceType {
  Library = 'LIBRARY',
  Newsletter = 'NEWSLETTER',
  Recommendation = 'RECOMMENDATION',
  Rss = 'RSS'
}

export type HomeResult = HomeError | HomeSuccess;

export type HomeSection = {
  __typename?: 'HomeSection';
  items: Array<HomeItem>;
  layout?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HomeSuccess = {
  __typename?: 'HomeSuccess';
  edges: Array<HomeEdge>;
  pageInfo: PageInfo;
};

export type ImportFromIntegrationError = {
  __typename?: 'ImportFromIntegrationError';
  errorCodes: Array<ImportFromIntegrationErrorCode>;
};

export enum ImportFromIntegrationErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ImportFromIntegrationResult = ImportFromIntegrationError | ImportFromIntegrationSuccess;

export type ImportFromIntegrationSuccess = {
  __typename?: 'ImportFromIntegrationSuccess';
  success: Scalars['Boolean']['output'];
};

export enum ImportItemState {
  All = 'ALL',
  Archived = 'ARCHIVED',
  Unarchived = 'UNARCHIVED',
  Unread = 'UNREAD'
}

export type Integration = {
  __typename?: 'Integration';
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  settings?: Maybe<Scalars['JSON']['output']>;
  taskName?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: IntegrationType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type IntegrationError = {
  __typename?: 'IntegrationError';
  errorCodes: Array<IntegrationErrorCode>;
};

export enum IntegrationErrorCode {
  NotFound = 'NOT_FOUND'
}

export type IntegrationResult = IntegrationError | IntegrationSuccess;

export type IntegrationSuccess = {
  __typename?: 'IntegrationSuccess';
  integration: Integration;
};

export enum IntegrationType {
  Anki = 'ANKI',
  Export = 'EXPORT',
  Import = 'IMPORT'
}

export type IntegrationsError = {
  __typename?: 'IntegrationsError';
  errorCodes: Array<IntegrationsErrorCode>;
};

export enum IntegrationsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type IntegrationsResult = IntegrationsError | IntegrationsSuccess;

export type IntegrationsSuccess = {
  __typename?: 'IntegrationsSuccess';
  integrations: Array<Integration>;
};

export type JoinGroupError = {
  __typename?: 'JoinGroupError';
  errorCodes: Array<JoinGroupErrorCode>;
};

export enum JoinGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type JoinGroupResult = JoinGroupError | JoinGroupSuccess;

export type JoinGroupSuccess = {
  __typename?: 'JoinGroupSuccess';
  group: RecommendationGroup;
};

export type Label = {
  __typename?: 'Label';
  color: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internal?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type LabelsError = {
  __typename?: 'LabelsError';
  errorCodes: Array<LabelsErrorCode>;
};

export enum LabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type LabelsResult = LabelsError | LabelsSuccess;

export type LabelsSuccess = {
  __typename?: 'LabelsSuccess';
  labels: Array<Label>;
};

export type LeaveGroupError = {
  __typename?: 'LeaveGroupError';
  errorCodes: Array<LeaveGroupErrorCode>;
};

export enum LeaveGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type LeaveGroupResult = LeaveGroupError | LeaveGroupSuccess;

export type LeaveGroupSuccess = {
  __typename?: 'LeaveGroupSuccess';
  success: Scalars['Boolean']['output'];
};

export type Link = {
  __typename?: 'Link';
  highlightStats: HighlightStats;
  id: Scalars['ID']['output'];
  page: Page;
  postedByViewer: Scalars['Boolean']['output'];
  readState: ReadState;
  savedAt: Scalars['Date']['output'];
  savedBy: User;
  savedByViewer: Scalars['Boolean']['output'];
  shareInfo: LinkShareInfo;
  shareStats: ShareStats;
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type LinkShareInfo = {
  __typename?: 'LinkShareInfo';
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type LogOutError = {
  __typename?: 'LogOutError';
  errorCodes: Array<LogOutErrorCode>;
};

export enum LogOutErrorCode {
  LogOutFailed = 'LOG_OUT_FAILED'
}

export type LogOutResult = LogOutError | LogOutSuccess;

export type LogOutSuccess = {
  __typename?: 'LogOutSuccess';
  message?: Maybe<Scalars['String']['output']>;
};

export type LoginError = {
  __typename?: 'LoginError';
  errorCodes: Array<LoginErrorCode>;
};

export enum LoginErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  AuthFailed = 'AUTH_FAILED',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  WrongSource = 'WRONG_SOURCE'
}

export type LoginResult = LoginError | LoginSuccess;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  me: User;
};

export type MarkEmailAsItemError = {
  __typename?: 'MarkEmailAsItemError';
  errorCodes: Array<MarkEmailAsItemErrorCode>;
};

export enum MarkEmailAsItemErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MarkEmailAsItemResult = MarkEmailAsItemError | MarkEmailAsItemSuccess;

export type MarkEmailAsItemSuccess = {
  __typename?: 'MarkEmailAsItemSuccess';
  success: Scalars['Boolean']['output'];
};

export type MergeHighlightError = {
  __typename?: 'MergeHighlightError';
  errorCodes: Array<MergeHighlightErrorCode>;
};

export enum MergeHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MergeHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  articleId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  highlightPositionAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  highlightPositionPercent?: InputMaybe<Scalars['Float']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  overlapHighlightIdList: Array<Scalars['String']['input']>;
  patch: Scalars['String']['input'];
  prefix?: InputMaybe<Scalars['String']['input']>;
  quote: Scalars['String']['input'];
  representation?: InputMaybe<RepresentationType>;
  shortId: Scalars['ID']['input'];
  suffix?: InputMaybe<Scalars['String']['input']>;
};

export type MergeHighlightResult = MergeHighlightError | MergeHighlightSuccess;

export type MergeHighlightSuccess = {
  __typename?: 'MergeHighlightSuccess';
  highlight: Highlight;
  overlapHighlightIdList: Array<Scalars['String']['output']>;
};

export type MoveFilterError = {
  __typename?: 'MoveFilterError';
  errorCodes: Array<MoveFilterErrorCode>;
};

export enum MoveFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MoveFilterInput = {
  afterFilterId?: InputMaybe<Scalars['ID']['input']>;
  filterId: Scalars['ID']['input'];
};

export type MoveFilterResult = MoveFilterError | MoveFilterSuccess;

export type MoveFilterSuccess = {
  __typename?: 'MoveFilterSuccess';
  filter: Filter;
};

export type MoveLabelError = {
  __typename?: 'MoveLabelError';
  errorCodes: Array<MoveLabelErrorCode>;
};

export enum MoveLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MoveLabelInput = {
  afterLabelId?: InputMaybe<Scalars['ID']['input']>;
  labelId: Scalars['ID']['input'];
};

export type MoveLabelResult = MoveLabelError | MoveLabelSuccess;

export type MoveLabelSuccess = {
  __typename?: 'MoveLabelSuccess';
  label: Label;
};

export type MoveToFolderError = {
  __typename?: 'MoveToFolderError';
  errorCodes: Array<MoveToFolderErrorCode>;
};

export enum MoveToFolderErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type MoveToFolderResult = MoveToFolderError | MoveToFolderSuccess;

export type MoveToFolderSuccess = {
  __typename?: 'MoveToFolderSuccess';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDiscoverFeed: AddDiscoverFeedResult;
  addPopularRead: AddPopularReadResult;
  bulkAction: BulkActionResult;
  createArticle: CreateArticleResult;
  createArticleSavingRequest: CreateArticleSavingRequestResult;
  createFolderPolicy: CreateFolderPolicyResult;
  createGroup: CreateGroupResult;
  createHighlight: CreateHighlightResult;
  createLabel: CreateLabelResult;
  createNewsletterEmail: CreateNewsletterEmailResult;
  createPost: CreatePostResult;
  deleteAccount: DeleteAccountResult;
  deleteDiscoverArticle: DeleteDiscoverArticleResult;
  deleteDiscoverFeed: DeleteDiscoverFeedResult;
  deleteFilter: DeleteFilterResult;
  deleteFolderPolicy: DeleteFolderPolicyResult;
  deleteHighlight: DeleteHighlightResult;
  deleteIntegration: DeleteIntegrationResult;
  deleteLabel: DeleteLabelResult;
  deleteNewsletterEmail: DeleteNewsletterEmailResult;
  deletePost: DeletePostResult;
  deleteRule: DeleteRuleResult;
  deleteWebhook: DeleteWebhookResult;
  editDiscoverFeed: EditDiscoverFeedResult;
  emptyTrash: EmptyTrashResult;
  exportToIntegration: ExportToIntegrationResult;
  fetchContent: FetchContentResult;
  generateAnkiCards: GenerateAnkiCardsResult;
  generateAnkiCardsBatch: GenerateAnkiCardsBatchResult;
  generateApiKey: GenerateApiKeyResult;
  googleLogin: LoginResult;
  googleSignup: GoogleSignupResult;
  importFromIntegration: ImportFromIntegrationResult;
  joinGroup: JoinGroupResult;
  leaveGroup: LeaveGroupResult;
  logOut: LogOutResult;
  markEmailAsItem: MarkEmailAsItemResult;
  mergeHighlight: MergeHighlightResult;
  moveFilter: MoveFilterResult;
  moveLabel: MoveLabelResult;
  moveToFolder: MoveToFolderResult;
  optInFeature: OptInFeatureResult;
  recommend: RecommendResult;
  recommendHighlights: RecommendHighlightsResult;
  refreshHome: RefreshHomeResult;
  regenerateAnkiCards: RegenerateAnkiCardsResult;
  replyToEmail: ReplyToEmailResult;
  reportItem: ReportItemResult;
  revokeApiKey: RevokeApiKeyResult;
  saveArticleReadingProgress: SaveArticleReadingProgressResult;
  saveDiscoverArticle: SaveDiscoverArticleResult;
  saveFile: SaveResult;
  saveFilter: SaveFilterResult;
  savePage: SaveResult;
  saveUrl: SaveResult;
  setBookmarkArticle: SetBookmarkArticleResult;
  setDeviceToken: SetDeviceTokenResult;
  setFavoriteArticle: SetFavoriteArticleResult;
  setIntegration: SetIntegrationResult;
  setLabels: SetLabelsResult;
  setLabelsForHighlight: SetLabelsResult;
  setLinkArchived: ArchiveLinkResult;
  setRule: SetRuleResult;
  setShowTranslated: SetShowTranslatedResult;
  setUserPersonalization: SetUserPersonalizationResult;
  setWebhook: SetWebhookResult;
  subscribe: SubscribeResult;
  testAnkiConnection: TestAnkiConnectionResult;
  unsubscribe: UnsubscribeResult;
  updateEmail: UpdateEmailResult;
  updateFilter: UpdateFilterResult;
  updateFolderPolicy: UpdateFolderPolicyResult;
  updateHighlight: UpdateHighlightResult;
  updateLabel: UpdateLabelResult;
  updateNewsletterEmail: UpdateNewsletterEmailResult;
  updatePage: UpdatePageResult;
  updatePost: UpdatePostResult;
  updateSubscription: UpdateSubscriptionResult;
  updateUser: UpdateUserResult;
  updateUserProfile: UpdateUserProfileResult;
  uploadFileRequest: UploadFileRequestResult;
  uploadImportFile: UploadImportFileResult;
};


export type MutationAddDiscoverFeedArgs = {
  input: AddDiscoverFeedInput;
};


export type MutationAddPopularReadArgs = {
  name: Scalars['String']['input'];
};


export type MutationBulkActionArgs = {
  action: BulkActionType;
  arguments?: InputMaybe<Scalars['JSON']['input']>;
  async?: InputMaybe<Scalars['Boolean']['input']>;
  expectedCount?: InputMaybe<Scalars['Int']['input']>;
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  query: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateArticleSavingRequestArgs = {
  input: CreateArticleSavingRequestInput;
};


export type MutationCreateFolderPolicyArgs = {
  input: CreateFolderPolicyInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateHighlightArgs = {
  input: CreateHighlightInput;
};


export type MutationCreateLabelArgs = {
  input: CreateLabelInput;
};


export type MutationCreateNewsletterEmailArgs = {
  input?: InputMaybe<CreateNewsletterEmailInput>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteAccountArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationDeleteDiscoverArticleArgs = {
  input: DeleteDiscoverArticleInput;
};


export type MutationDeleteDiscoverFeedArgs = {
  input: DeleteDiscoverFeedInput;
};


export type MutationDeleteFilterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFolderPolicyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteHighlightArgs = {
  highlightId: Scalars['ID']['input'];
};


export type MutationDeleteIntegrationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLabelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNewsletterEmailArgs = {
  newsletterEmailId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWebhookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditDiscoverFeedArgs = {
  input: EditDiscoverFeedInput;
};


export type MutationExportToIntegrationArgs = {
  integrationId: Scalars['ID']['input'];
};


export type MutationFetchContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGenerateAnkiCardsArgs = {
  libraryItemId: Scalars['ID']['input'];
};


export type MutationGenerateAnkiCardsBatchArgs = {
  input: GenerateAnkiCardsBatchInput;
};


export type MutationGenerateApiKeyArgs = {
  input: GenerateApiKeyInput;
};


export type MutationGoogleLoginArgs = {
  input: GoogleLoginInput;
};


export type MutationGoogleSignupArgs = {
  input: GoogleSignupInput;
};


export type MutationImportFromIntegrationArgs = {
  integrationId: Scalars['ID']['input'];
};


export type MutationJoinGroupArgs = {
  inviteCode: Scalars['String']['input'];
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationMarkEmailAsItemArgs = {
  recentEmailId: Scalars['ID']['input'];
};


export type MutationMergeHighlightArgs = {
  input: MergeHighlightInput;
};


export type MutationMoveFilterArgs = {
  input: MoveFilterInput;
};


export type MutationMoveLabelArgs = {
  input: MoveLabelInput;
};


export type MutationMoveToFolderArgs = {
  folder: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationOptInFeatureArgs = {
  input: OptInFeatureInput;
};


export type MutationRecommendArgs = {
  input: RecommendInput;
};


export type MutationRecommendHighlightsArgs = {
  input: RecommendHighlightsInput;
};


export type MutationRegenerateAnkiCardsArgs = {
  libraryItemId: Scalars['ID']['input'];
};


export type MutationReplyToEmailArgs = {
  recentEmailId: Scalars['ID']['input'];
  reply: AllowedReply;
};


export type MutationReportItemArgs = {
  input: ReportItemInput;
};


export type MutationRevokeApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSaveArticleReadingProgressArgs = {
  input: SaveArticleReadingProgressInput;
};


export type MutationSaveDiscoverArticleArgs = {
  input: SaveDiscoverArticleInput;
};


export type MutationSaveFileArgs = {
  input: SaveFileInput;
};


export type MutationSaveFilterArgs = {
  input: SaveFilterInput;
};


export type MutationSavePageArgs = {
  input: SavePageInput;
};


export type MutationSaveUrlArgs = {
  input: SaveUrlInput;
};


export type MutationSetBookmarkArticleArgs = {
  input: SetBookmarkArticleInput;
};


export type MutationSetDeviceTokenArgs = {
  input: SetDeviceTokenInput;
};


export type MutationSetFavoriteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetIntegrationArgs = {
  input: SetIntegrationInput;
};


export type MutationSetLabelsArgs = {
  input: SetLabelsInput;
};


export type MutationSetLabelsForHighlightArgs = {
  input: SetLabelsForHighlightInput;
};


export type MutationSetLinkArchivedArgs = {
  input: ArchiveLinkInput;
};


export type MutationSetRuleArgs = {
  input: SetRuleInput;
};


export type MutationSetShowTranslatedArgs = {
  id: Scalars['ID']['input'];
  showTranslated: Scalars['Boolean']['input'];
};


export type MutationSetUserPersonalizationArgs = {
  input: SetUserPersonalizationInput;
};


export type MutationSetWebhookArgs = {
  input: SetWebhookInput;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationTestAnkiConnectionArgs = {
  input: TestAnkiConnectionInput;
};


export type MutationUnsubscribeArgs = {
  name: Scalars['String']['input'];
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateEmailArgs = {
  input: UpdateEmailInput;
};


export type MutationUpdateFilterArgs = {
  input: UpdateFilterInput;
};


export type MutationUpdateFolderPolicyArgs = {
  input: UpdateFolderPolicyInput;
};


export type MutationUpdateHighlightArgs = {
  input: UpdateHighlightInput;
};


export type MutationUpdateLabelArgs = {
  input: UpdateLabelInput;
};


export type MutationUpdateNewsletterEmailArgs = {
  input: UpdateNewsletterEmailInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUploadFileRequestArgs = {
  input: UploadFileRequestInput;
};


export type MutationUploadImportFileArgs = {
  contentType: Scalars['String']['input'];
  type: UploadImportFileType;
};

export type NewsletterEmail = {
  __typename?: 'NewsletterEmail';
  address: Scalars['String']['output'];
  confirmationCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  folder: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  subscriptionCount: Scalars['Int']['output'];
};

export type NewsletterEmailsError = {
  __typename?: 'NewsletterEmailsError';
  errorCodes: Array<NewsletterEmailsErrorCode>;
};

export enum NewsletterEmailsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type NewsletterEmailsResult = NewsletterEmailsError | NewsletterEmailsSuccess;

export type NewsletterEmailsSuccess = {
  __typename?: 'NewsletterEmailsSuccess';
  newsletterEmails: Array<NewsletterEmail>;
};

export type OptInFeatureError = {
  __typename?: 'OptInFeatureError';
  errorCodes: Array<OptInFeatureErrorCode>;
};

export enum OptInFeatureErrorCode {
  BadRequest = 'BAD_REQUEST',
  Ineligible = 'INELIGIBLE',
  NotFound = 'NOT_FOUND'
}

export type OptInFeatureInput = {
  name: Scalars['String']['input'];
};

export type OptInFeatureResult = OptInFeatureError | OptInFeatureSuccess;

export type OptInFeatureSuccess = {
  __typename?: 'OptInFeatureSuccess';
  feature: Feature;
};

export type Page = {
  __typename?: 'Page';
  author?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  originalHtml: Scalars['String']['output'];
  originalUrl: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['Date']['output']>;
  readableHtml: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: PageType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PageInfoInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum PageType {
  Article = 'ARTICLE',
  Book = 'BOOK',
  File = 'FILE',
  Highlights = 'HIGHLIGHTS',
  Image = 'IMAGE',
  Profile = 'PROFILE',
  Tweet = 'TWEET',
  Unknown = 'UNKNOWN',
  Video = 'VIDEO',
  Website = 'WEBSITE'
}

export type ParseResult = {
  byline?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  dir?: InputMaybe<Scalars['String']['input']>;
  excerpt: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  length: Scalars['Int']['input'];
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedDate?: InputMaybe<Scalars['Date']['input']>;
  siteIcon?: InputMaybe<Scalars['String']['input']>;
  siteName?: InputMaybe<Scalars['String']['input']>;
  textContent: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  highlights?: Maybe<Array<Highlight>>;
  id: Scalars['ID']['output'];
  libraryItems?: Maybe<Array<Article>>;
  ownedByViewer: Scalars['Boolean']['output'];
  thought?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type PostError = {
  __typename?: 'PostError';
  errorCodes: Array<PostErrorCode>;
};

export enum PostErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type PostResult = PostError | PostSuccess;

export type PostSuccess = {
  __typename?: 'PostSuccess';
  post: Post;
};

export type PostsError = {
  __typename?: 'PostsError';
  errorCodes: Array<PostsErrorCode>;
};

export enum PostsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type PostsResult = PostsError | PostsSuccess;

export type PostsSuccess = {
  __typename?: 'PostsSuccess';
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PreparedDocumentInput = {
  document: Scalars['String']['input'];
  pageInfo: PageInfoInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  pictureUrl?: Maybe<Scalars['String']['output']>;
  private: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  ankiCardBatches: AnkiCardBatchesResult;
  ankiCards: AnkiCardsResult;
  ankiIntegration: AnkiIntegrationResult;
  apiKeys: ApiKeysResult;
  article: ArticleResult;
  articleSavingRequest: ArticleSavingRequestResult;
  deviceTokens: DeviceTokensResult;
  discoverFeeds: DiscoverFeedResult;
  discoverTopics: GetDiscoverTopicResults;
  feeds: FeedsResult;
  filters: FiltersResult;
  folderPolicies: FolderPoliciesResult;
  getDiscoverFeedArticles: GetDiscoverFeedArticleResults;
  getUserPersonalization: GetUserPersonalizationResult;
  groups: GroupsResult;
  hello?: Maybe<Scalars['String']['output']>;
  hiddenHomeSection: HiddenHomeSectionResult;
  highlights: HighlightsResult;
  home: HomeResult;
  integration: IntegrationResult;
  integrations: IntegrationsResult;
  labels: LabelsResult;
  me?: Maybe<User>;
  newsletterEmails: NewsletterEmailsResult;
  post: PostResult;
  posts: PostsResult;
  recentEmails: RecentEmailsResult;
  recentSearches: RecentSearchesResult;
  rules: RulesResult;
  scanFeeds: ScanFeedsResult;
  search: SearchResult;
  sendInstallInstructions: SendInstallInstructionsResult;
  subscription: SubscriptionResult;
  subscriptions: SubscriptionsResult;
  typeaheadSearch: TypeaheadSearchResult;
  updatesSince: UpdatesSinceResult;
  user: UserResult;
  users: UsersResult;
  validateUsername: Scalars['Boolean']['output'];
  webhook: WebhookResult;
  webhooks: WebhooksResult;
};


export type QueryAnkiCardBatchesArgs = {
  input?: InputMaybe<AnkiCardBatchesInput>;
};


export type QueryAnkiCardsArgs = {
  libraryItemId: Scalars['ID']['input'];
};


export type QueryArticleArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryArticleSavingRequestArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFeedsArgs = {
  input: FeedsInput;
};


export type QueryGetDiscoverFeedArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  discoverTopicId: Scalars['String']['input'];
  feedId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHighlightsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHomeArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIntegrationArgs = {
  name: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryRulesArgs = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryScanFeedsArgs = {
  input: ScanFeedsInput;
};


export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  includeContent?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionsArgs = {
  sort?: InputMaybe<SortParams>;
  type?: InputMaybe<SubscriptionType>;
};


export type QueryTypeaheadSearchArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryUpdatesSinceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  since: Scalars['Date']['input'];
  sort?: InputMaybe<SortParams>;
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryValidateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryWebhookArgs = {
  id: Scalars['ID']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  code: ReactionType;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export enum ReactionType {
  Crying = 'CRYING',
  Heart = 'HEART',
  Hushed = 'HUSHED',
  Like = 'LIKE',
  Pout = 'POUT',
  Smile = 'SMILE'
}

export type ReadState = {
  __typename?: 'ReadState';
  progressAnchorIndex: Scalars['Int']['output'];
  progressPercent: Scalars['Float']['output'];
  reading?: Maybe<Scalars['Boolean']['output']>;
  readingTime?: Maybe<Scalars['Int']['output']>;
};

export type RecentEmail = {
  __typename?: 'RecentEmail';
  createdAt: Scalars['Date']['output'];
  from: Scalars['String']['output'];
  html?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  reply?: Maybe<Scalars['String']['output']>;
  replyTo?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  text: Scalars['String']['output'];
  to: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RecentEmailsError = {
  __typename?: 'RecentEmailsError';
  errorCodes: Array<RecentEmailsErrorCode>;
};

export enum RecentEmailsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecentEmailsResult = RecentEmailsError | RecentEmailsSuccess;

export type RecentEmailsSuccess = {
  __typename?: 'RecentEmailsSuccess';
  recentEmails: Array<RecentEmail>;
};

export type RecentSearch = {
  __typename?: 'RecentSearch';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  term: Scalars['String']['output'];
};

export type RecentSearchesError = {
  __typename?: 'RecentSearchesError';
  errorCodes: Array<RecentSearchesErrorCode>;
};

export enum RecentSearchesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecentSearchesResult = RecentSearchesError | RecentSearchesSuccess;

export type RecentSearchesSuccess = {
  __typename?: 'RecentSearchesSuccess';
  searches: Array<RecentSearch>;
};

export type RecommendError = {
  __typename?: 'RecommendError';
  errorCodes: Array<RecommendErrorCode>;
};

export enum RecommendErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecommendHighlightsError = {
  __typename?: 'RecommendHighlightsError';
  errorCodes: Array<RecommendHighlightsErrorCode>;
};

export enum RecommendHighlightsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecommendHighlightsInput = {
  groupIds: Array<Scalars['ID']['input']>;
  highlightIds: Array<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
};

export type RecommendHighlightsResult = RecommendHighlightsError | RecommendHighlightsSuccess;

export type RecommendHighlightsSuccess = {
  __typename?: 'RecommendHighlightsSuccess';
  success: Scalars['Boolean']['output'];
};

export type RecommendInput = {
  groupIds: Array<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
  recommendedWithHighlights?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecommendResult = RecommendError | RecommendSuccess;

export type RecommendSuccess = {
  __typename?: 'RecommendSuccess';
  success: Scalars['Boolean']['output'];
};

export type Recommendation = {
  __typename?: 'Recommendation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  recommendedAt: Scalars['Date']['output'];
  user?: Maybe<RecommendingUser>;
};

export type RecommendationGroup = {
  __typename?: 'RecommendationGroup';
  admins: Array<User>;
  canPost: Scalars['Boolean']['output'];
  canSeeMembers: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inviteUrl: Scalars['String']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RecommendingUser = {
  __typename?: 'RecommendingUser';
  name: Scalars['String']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type RefreshHomeError = {
  __typename?: 'RefreshHomeError';
  errorCodes: Array<RefreshHomeErrorCode>;
};

export enum RefreshHomeErrorCode {
  Pending = 'PENDING'
}

export type RefreshHomeResult = RefreshHomeError | RefreshHomeSuccess;

export type RefreshHomeSuccess = {
  __typename?: 'RefreshHomeSuccess';
  success: Scalars['Boolean']['output'];
};

export type RegenerateAnkiCardsError = {
  __typename?: 'RegenerateAnkiCardsError';
  errorCodes: Array<RegenerateAnkiCardsErrorCode>;
};

export enum RegenerateAnkiCardsErrorCode {
  BadRequest = 'BAD_REQUEST',
  FailedToEnqueue = 'FAILED_TO_ENQUEUE',
  IntegrationNotConfigured = 'INTEGRATION_NOT_CONFIGURED',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RegenerateAnkiCardsResult = RegenerateAnkiCardsError | RegenerateAnkiCardsSuccess;

export type RegenerateAnkiCardsSuccess = {
  __typename?: 'RegenerateAnkiCardsSuccess';
  batch: AnkiCardBatch;
};

export type Reminder = {
  __typename?: 'Reminder';
  archiveUntil: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  remindAt: Scalars['Date']['output'];
  sendNotification: Scalars['Boolean']['output'];
};

export type ReminderError = {
  __typename?: 'ReminderError';
  errorCodes: Array<ReminderErrorCode>;
};

export enum ReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ReminderResult = ReminderError | ReminderSuccess;

export type ReminderSuccess = {
  __typename?: 'ReminderSuccess';
  reminder: Reminder;
};

export type ReplyToEmailError = {
  __typename?: 'ReplyToEmailError';
  errorCodes: Array<ReplyToEmailErrorCode>;
};

export enum ReplyToEmailErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type ReplyToEmailResult = ReplyToEmailError | ReplyToEmailSuccess;

export type ReplyToEmailSuccess = {
  __typename?: 'ReplyToEmailSuccess';
  success: Scalars['Boolean']['output'];
};

export type ReportItemInput = {
  itemUrl: Scalars['String']['input'];
  pageId: Scalars['ID']['input'];
  reportComment: Scalars['String']['input'];
  reportTypes: Array<ReportType>;
  sharedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type ReportItemResult = {
  __typename?: 'ReportItemResult';
  message: Scalars['String']['output'];
};

export enum ReportType {
  Abusive = 'ABUSIVE',
  ContentDisplay = 'CONTENT_DISPLAY',
  ContentViolation = 'CONTENT_VIOLATION',
  Spam = 'SPAM'
}

export enum RepresentationType {
  Content = 'CONTENT',
  FeedContent = 'FEED_CONTENT'
}

export type RevokeApiKeyError = {
  __typename?: 'RevokeApiKeyError';
  errorCodes: Array<RevokeApiKeyErrorCode>;
};

export enum RevokeApiKeyErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RevokeApiKeyResult = RevokeApiKeyError | RevokeApiKeySuccess;

export type RevokeApiKeySuccess = {
  __typename?: 'RevokeApiKeySuccess';
  apiKey: ApiKey;
};

export type Rule = {
  __typename?: 'Rule';
  actions: Array<RuleAction>;
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  eventTypes: Array<RuleEventType>;
  failedAt?: Maybe<Scalars['Date']['output']>;
  filter: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RuleAction = {
  __typename?: 'RuleAction';
  params: Array<Scalars['String']['output']>;
  type: RuleActionType;
};

export type RuleActionInput = {
  params: Array<Scalars['String']['input']>;
  type: RuleActionType;
};

export enum RuleActionType {
  AddLabel = 'ADD_LABEL',
  Archive = 'ARCHIVE',
  Delete = 'DELETE',
  Export = 'EXPORT',
  MarkAsRead = 'MARK_AS_READ',
  SendNotification = 'SEND_NOTIFICATION',
  Webhook = 'WEBHOOK'
}

export enum RuleEventType {
  HighlightCreated = 'HIGHLIGHT_CREATED',
  HighlightUpdated = 'HIGHLIGHT_UPDATED',
  LabelCreated = 'LABEL_CREATED',
  PageCreated = 'PAGE_CREATED',
  PageUpdated = 'PAGE_UPDATED'
}

export type RulesError = {
  __typename?: 'RulesError';
  errorCodes: Array<RulesErrorCode>;
};

export enum RulesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RulesResult = RulesError | RulesSuccess;

export type RulesSuccess = {
  __typename?: 'RulesSuccess';
  rules: Array<Rule>;
};

export type SaveArticleReadingProgressError = {
  __typename?: 'SaveArticleReadingProgressError';
  errorCodes: Array<SaveArticleReadingProgressErrorCode>;
};

export enum SaveArticleReadingProgressErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SaveArticleReadingProgressInput = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  readingProgressAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  readingProgressPercent: Scalars['Float']['input'];
  readingProgressTopPercent?: InputMaybe<Scalars['Float']['input']>;
};

export type SaveArticleReadingProgressResult = SaveArticleReadingProgressError | SaveArticleReadingProgressSuccess;

export type SaveArticleReadingProgressSuccess = {
  __typename?: 'SaveArticleReadingProgressSuccess';
  updatedArticle: Article;
};

export type SaveDiscoverArticleError = {
  __typename?: 'SaveDiscoverArticleError';
  errorCodes: Array<SaveDiscoverArticleErrorCode>;
};

export enum SaveDiscoverArticleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SaveDiscoverArticleInput = {
  discoverArticleId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type SaveDiscoverArticleResult = SaveDiscoverArticleError | SaveDiscoverArticleSuccess;

export type SaveDiscoverArticleSuccess = {
  __typename?: 'SaveDiscoverArticleSuccess';
  saveId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SaveError = {
  __typename?: 'SaveError';
  errorCodes: Array<SaveErrorCode>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum SaveErrorCode {
  EmbeddedHighlightFailed = 'EMBEDDED_HIGHLIGHT_FAILED',
  Unauthorized = 'UNAUTHORIZED',
  Unknown = 'UNKNOWN'
}

export type SaveFileInput = {
  clientRequestId: Scalars['ID']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  subscription?: InputMaybe<Scalars['String']['input']>;
  uploadFileId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};

export type SaveFilterError = {
  __typename?: 'SaveFilterError';
  errorCodes: Array<SaveFilterErrorCode>;
};

export enum SaveFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SaveFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  filter: Scalars['String']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type SaveFilterResult = SaveFilterError | SaveFilterSuccess;

export type SaveFilterSuccess = {
  __typename?: 'SaveFilterSuccess';
  filter: Filter;
};

export type SavePageInput = {
  clientRequestId: Scalars['ID']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  originalContent: Scalars['String']['input'];
  parseResult?: InputMaybe<ParseResult>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  rssFeedUrl?: InputMaybe<Scalars['String']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type SaveResult = SaveError | SaveSuccess;

export type SaveSuccess = {
  __typename?: 'SaveSuccess';
  clientRequestId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type SaveUrlInput = {
  clientRequestId: Scalars['ID']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type ScanFeedsError = {
  __typename?: 'ScanFeedsError';
  errorCodes: Array<ScanFeedsErrorCode>;
};

export enum ScanFeedsErrorCode {
  BadRequest = 'BAD_REQUEST'
}

export type ScanFeedsInput = {
  opml?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ScanFeedsResult = ScanFeedsError | ScanFeedsSuccess;

export type ScanFeedsSuccess = {
  __typename?: 'ScanFeedsSuccess';
  feeds: Array<Feed>;
};

export type SearchError = {
  __typename?: 'SearchError';
  errorCodes: Array<SearchErrorCode>;
};

export enum SearchErrorCode {
  QueryTooLong = 'QUERY_TOO_LONG',
  Unauthorized = 'UNAUTHORIZED'
}

export type SearchItem = {
  __typename?: 'SearchItem';
  aiSummary?: Maybe<Scalars['String']['output']>;
  ankiCardCount?: Maybe<Scalars['Int']['output']>;
  annotation?: Maybe<Scalars['String']['output']>;
  archivedAt?: Maybe<Scalars['Date']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentReader: ContentReader;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  directionality?: Maybe<DirectionalityType>;
  feedContent?: Maybe<Scalars['String']['output']>;
  folder: Scalars['String']['output'];
  format?: Maybe<Scalars['String']['output']>;
  highlights?: Maybe<Array<Highlight>>;
  highlightsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isArchived: Scalars['Boolean']['output'];
  labels?: Maybe<Array<Label>>;
  language?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Scalars['JSON']['output']>;
  originalArticleUrl?: Maybe<Scalars['String']['output']>;
  ownedByViewer?: Maybe<Scalars['Boolean']['output']>;
  pageId?: Maybe<Scalars['ID']['output']>;
  pageType: PageType;
  previewContentType?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['Date']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  readAt?: Maybe<Scalars['Date']['output']>;
  readingProgressAnchorIndex: Scalars['Int']['output'];
  readingProgressPercent: Scalars['Float']['output'];
  readingProgressTopPercent?: Maybe<Scalars['Float']['output']>;
  recommendations?: Maybe<Array<Recommendation>>;
  savedAt: Scalars['Date']['output'];
  score?: Maybe<Scalars['Float']['output']>;
  seenAt?: Maybe<Scalars['Date']['output']>;
  shortId?: Maybe<Scalars['String']['output']>;
  siteIcon?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  state?: Maybe<ArticleSavingRequestStatus>;
  subscription?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  translatedLanguage?: Maybe<Scalars['String']['output']>;
  translationStatus?: Maybe<Scalars['String']['output']>;
  unsubHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  url: Scalars['String']['output'];
  wordsCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchItemEdge = {
  __typename?: 'SearchItemEdge';
  cursor: Scalars['String']['output'];
  node: SearchItem;
};

export type SearchResult = SearchError | SearchSuccess;

export type SearchSuccess = {
  __typename?: 'SearchSuccess';
  edges: Array<SearchItemEdge>;
  pageInfo: PageInfo;
};

export type SendInstallInstructionsError = {
  __typename?: 'SendInstallInstructionsError';
  errorCodes: Array<SendInstallInstructionsErrorCode>;
};

export enum SendInstallInstructionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SendInstallInstructionsResult = SendInstallInstructionsError | SendInstallInstructionsSuccess;

export type SendInstallInstructionsSuccess = {
  __typename?: 'SendInstallInstructionsSuccess';
  sent: Scalars['Boolean']['output'];
};

export type SetBookmarkArticleError = {
  __typename?: 'SetBookmarkArticleError';
  errorCodes: Array<SetBookmarkArticleErrorCode>;
};

export enum SetBookmarkArticleErrorCode {
  BookmarkExists = 'BOOKMARK_EXISTS',
  NotFound = 'NOT_FOUND'
}

export type SetBookmarkArticleInput = {
  articleID: Scalars['ID']['input'];
  bookmark: Scalars['Boolean']['input'];
};

export type SetBookmarkArticleResult = SetBookmarkArticleError | SetBookmarkArticleSuccess;

export type SetBookmarkArticleSuccess = {
  __typename?: 'SetBookmarkArticleSuccess';
  bookmarkedArticle: Article;
};

export type SetDeviceTokenError = {
  __typename?: 'SetDeviceTokenError';
  errorCodes: Array<SetDeviceTokenErrorCode>;
};

export enum SetDeviceTokenErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetDeviceTokenInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type SetDeviceTokenResult = SetDeviceTokenError | SetDeviceTokenSuccess;

export type SetDeviceTokenSuccess = {
  __typename?: 'SetDeviceTokenSuccess';
  deviceToken: DeviceToken;
};

export type SetFavoriteArticleError = {
  __typename?: 'SetFavoriteArticleError';
  errorCodes: Array<SetFavoriteArticleErrorCode>;
};

export enum SetFavoriteArticleErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetFavoriteArticleResult = SetFavoriteArticleError | SetFavoriteArticleSuccess;

export type SetFavoriteArticleSuccess = {
  __typename?: 'SetFavoriteArticleSuccess';
  success: Scalars['Boolean']['output'];
};

export type SetFollowError = {
  __typename?: 'SetFollowError';
  errorCodes: Array<SetFollowErrorCode>;
};

export enum SetFollowErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetFollowInput = {
  follow: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};

export type SetFollowResult = SetFollowError | SetFollowSuccess;

export type SetFollowSuccess = {
  __typename?: 'SetFollowSuccess';
  updatedUser: User;
};

export type SetIntegrationError = {
  __typename?: 'SetIntegrationError';
  errorCodes: Array<SetIntegrationErrorCode>;
};

export enum SetIntegrationErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  InvalidToken = 'INVALID_TOKEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetIntegrationInput = {
  enabled: Scalars['Boolean']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  importItemState?: InputMaybe<ImportItemState>;
  name: Scalars['String']['input'];
  settings?: InputMaybe<Scalars['JSON']['input']>;
  syncedAt?: InputMaybe<Scalars['Date']['input']>;
  taskName?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<IntegrationType>;
};

export type SetIntegrationResult = SetIntegrationError | SetIntegrationSuccess;

export type SetIntegrationSuccess = {
  __typename?: 'SetIntegrationSuccess';
  integration: Integration;
};

export type SetLabelsError = {
  __typename?: 'SetLabelsError';
  errorCodes: Array<SetLabelsErrorCode>;
};

export enum SetLabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetLabelsForHighlightInput = {
  highlightId: Scalars['ID']['input'];
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
};

export type SetLabelsInput = {
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  pageId: Scalars['ID']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};

export type SetLabelsResult = SetLabelsError | SetLabelsSuccess;

export type SetLabelsSuccess = {
  __typename?: 'SetLabelsSuccess';
  labels: Array<Label>;
};

export type SetRuleError = {
  __typename?: 'SetRuleError';
  errorCodes: Array<SetRuleErrorCode>;
};

export enum SetRuleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetRuleInput = {
  actions: Array<RuleActionInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  eventTypes: Array<RuleEventType>;
  filter: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type SetRuleResult = SetRuleError | SetRuleSuccess;

export type SetRuleSuccess = {
  __typename?: 'SetRuleSuccess';
  rule: Rule;
};

export type SetShareArticleError = {
  __typename?: 'SetShareArticleError';
  errorCodes: Array<SetShareArticleErrorCode>;
};

export enum SetShareArticleErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetShareArticleInput = {
  articleID: Scalars['ID']['input'];
  share: Scalars['Boolean']['input'];
  sharedComment?: InputMaybe<Scalars['String']['input']>;
  sharedWithHighlights?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SetShareArticleResult = SetShareArticleError | SetShareArticleSuccess;

export type SetShareArticleSuccess = {
  __typename?: 'SetShareArticleSuccess';
  updatedArticle: Article;
  updatedFeedArticle?: Maybe<FeedArticle>;
  updatedFeedArticleId?: Maybe<Scalars['String']['output']>;
};

export type SetShareHighlightError = {
  __typename?: 'SetShareHighlightError';
  errorCodes: Array<SetShareHighlightErrorCode>;
};

export enum SetShareHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetShareHighlightInput = {
  id: Scalars['ID']['input'];
  share: Scalars['Boolean']['input'];
};

export type SetShareHighlightResult = SetShareHighlightError | SetShareHighlightSuccess;

export type SetShareHighlightSuccess = {
  __typename?: 'SetShareHighlightSuccess';
  highlight: Highlight;
};

export type SetShowTranslatedError = {
  __typename?: 'SetShowTranslatedError';
  errorCodes: Array<SetShowTranslatedErrorCode>;
};

export enum SetShowTranslatedErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetShowTranslatedResult = SetShowTranslatedError | SetShowTranslatedSuccess;

export type SetShowTranslatedSuccess = {
  __typename?: 'SetShowTranslatedSuccess';
  article: Article;
};

export type SetUserPersonalizationError = {
  __typename?: 'SetUserPersonalizationError';
  errorCodes: Array<SetUserPersonalizationErrorCode>;
};

export enum SetUserPersonalizationErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetUserPersonalizationInput = {
  autoTranslate?: InputMaybe<Scalars['Boolean']['input']>;
  digestConfig?: InputMaybe<DigestConfigInput>;
  fields?: InputMaybe<Scalars['JSON']['input']>;
  fontFamily?: InputMaybe<Scalars['String']['input']>;
  fontSize?: InputMaybe<Scalars['Int']['input']>;
  libraryLayoutType?: InputMaybe<Scalars['String']['input']>;
  librarySortOrder?: InputMaybe<SortOrder>;
  margin?: InputMaybe<Scalars['Int']['input']>;
  preferredLanguage?: InputMaybe<Scalars['String']['input']>;
  speechRate?: InputMaybe<Scalars['String']['input']>;
  speechSecondaryVoice?: InputMaybe<Scalars['String']['input']>;
  speechVoice?: InputMaybe<Scalars['String']['input']>;
  speechVolume?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type SetUserPersonalizationResult = SetUserPersonalizationError | SetUserPersonalizationSuccess;

export type SetUserPersonalizationSuccess = {
  __typename?: 'SetUserPersonalizationSuccess';
  updatedUserPersonalization: UserPersonalization;
};

export type SetWebhookError = {
  __typename?: 'SetWebhookError';
  errorCodes: Array<SetWebhookErrorCode>;
};

export enum SetWebhookErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetWebhookInput = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  eventTypes: Array<WebhookEvent>;
  id?: InputMaybe<Scalars['ID']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type SetWebhookResult = SetWebhookError | SetWebhookSuccess;

export type SetWebhookSuccess = {
  __typename?: 'SetWebhookSuccess';
  webhook: Webhook;
};

export type ShareStats = {
  __typename?: 'ShareStats';
  readDuration: Scalars['Int']['output'];
  saveCount: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type SharedArticleError = {
  __typename?: 'SharedArticleError';
  errorCodes: Array<SharedArticleErrorCode>;
};

export enum SharedArticleErrorCode {
  NotFound = 'NOT_FOUND'
}

export type SharedArticleResult = SharedArticleError | SharedArticleSuccess;

export type SharedArticleSuccess = {
  __typename?: 'SharedArticleSuccess';
  article: Article;
};

export enum SignupErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  ExpiredToken = 'EXPIRED_TOKEN',
  GoogleAuthError = 'GOOGLE_AUTH_ERROR',
  InvalidEmail = 'INVALID_EMAIL',
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidUsername = 'INVALID_USERNAME',
  Unknown = 'UNKNOWN',
  UserExists = 'USER_EXISTS'
}

export enum SortBy {
  PublishedAt = 'PUBLISHED_AT',
  SavedAt = 'SAVED_AT',
  Score = 'SCORE',
  UpdatedTime = 'UPDATED_TIME'
}

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type SortParams = {
  by: SortBy;
  order?: InputMaybe<SortOrder>;
};

export type SubscribeError = {
  __typename?: 'SubscribeError';
  errorCodes: Array<SubscribeErrorCode>;
};

export enum SubscribeErrorCode {
  AlreadySubscribed = 'ALREADY_SUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  ExceededMaxSubscriptions = 'EXCEEDED_MAX_SUBSCRIPTIONS',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SubscribeInput = {
  autoAddToLibrary?: InputMaybe<Scalars['Boolean']['input']>;
  fetchContent?: InputMaybe<Scalars['Boolean']['input']>;
  fetchContentType?: InputMaybe<FetchContentType>;
  folder?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  subscriptionType?: InputMaybe<SubscriptionType>;
  url: Scalars['String']['input'];
};

export type SubscribeResult = SubscribeError | SubscribeSuccess;

export type SubscribeSuccess = {
  __typename?: 'SubscribeSuccess';
  subscriptions: Array<Subscription>;
};

export type Subscription = {
  __typename?: 'Subscription';
  autoAddToLibrary?: Maybe<Scalars['Boolean']['output']>;
  count: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  failedAt?: Maybe<Scalars['Date']['output']>;
  fetchContent: Scalars['Boolean']['output'];
  fetchContentType: FetchContentType;
  folder: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  lastFetchedAt?: Maybe<Scalars['Date']['output']>;
  mostRecentItemDate?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  newsletterEmail?: Maybe<Scalars['String']['output']>;
  refreshedAt?: Maybe<Scalars['Date']['output']>;
  status: SubscriptionStatus;
  type: SubscriptionType;
  unsubscribeHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubscribeMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SubscriptionError = {
  __typename?: 'SubscriptionError';
  errorCodes: Array<ErrorCode>;
};

export type SubscriptionResult = SubscriptionError | SubscriptionSuccess;

export type SubscriptionRootType = {
  __typename?: 'SubscriptionRootType';
  hello?: Maybe<Scalars['String']['output']>;
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Unsubscribed = 'UNSUBSCRIBED'
}

export type SubscriptionSuccess = {
  __typename?: 'SubscriptionSuccess';
  subscription: Subscription;
};

export enum SubscriptionType {
  Newsletter = 'NEWSLETTER',
  Rss = 'RSS'
}

export type SubscriptionsError = {
  __typename?: 'SubscriptionsError';
  errorCodes: Array<SubscriptionsErrorCode>;
};

export enum SubscriptionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type SubscriptionsResult = SubscriptionsError | SubscriptionsSuccess;

export type SubscriptionsSuccess = {
  __typename?: 'SubscriptionsSuccess';
  subscriptions: Array<Subscription>;
};

export type SyncUpdatedItemEdge = {
  __typename?: 'SyncUpdatedItemEdge';
  cursor: Scalars['String']['output'];
  itemID: Scalars['ID']['output'];
  node?: Maybe<SearchItem>;
  updateReason: UpdateReason;
};

export type Task = {
  __typename?: 'Task';
  cancellable?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['Date']['output'];
  failedReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  progress?: Maybe<Scalars['Float']['output']>;
  runningTime?: Maybe<Scalars['Int']['output']>;
  state: TaskState;
};

export enum TaskState {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Running = 'RUNNING',
  Succeeded = 'SUCCEEDED'
}

export type TestAnkiConnectionError = {
  __typename?: 'TestAnkiConnectionError';
  errorCodes: Array<TestAnkiConnectionErrorCode>;
};

export enum TestAnkiConnectionErrorCode {
  BadRequest = 'BAD_REQUEST',
  ConnectionFailed = 'CONNECTION_FAILED',
  Unauthorized = 'UNAUTHORIZED'
}

export type TestAnkiConnectionInput = {
  ankiConnectUrl: Scalars['String']['input'];
  apiKey?: InputMaybe<Scalars['String']['input']>;
};

export type TestAnkiConnectionResult = TestAnkiConnectionError | TestAnkiConnectionSuccess;

export type TestAnkiConnectionSuccess = {
  __typename?: 'TestAnkiConnectionSuccess';
  success: Scalars['Boolean']['output'];
  version?: Maybe<Scalars['Int']['output']>;
};

export enum TranslationStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type TypeaheadSearchError = {
  __typename?: 'TypeaheadSearchError';
  errorCodes: Array<TypeaheadSearchErrorCode>;
};

export enum TypeaheadSearchErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type TypeaheadSearchItem = {
  __typename?: 'TypeaheadSearchItem';
  contentReader: ContentReader;
  id: Scalars['ID']['output'];
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TypeaheadSearchResult = TypeaheadSearchError | TypeaheadSearchSuccess;

export type TypeaheadSearchSuccess = {
  __typename?: 'TypeaheadSearchSuccess';
  items: Array<TypeaheadSearchItem>;
};

export type UnsubscribeError = {
  __typename?: 'UnsubscribeError';
  errorCodes: Array<UnsubscribeErrorCode>;
};

export enum UnsubscribeErrorCode {
  AlreadyUnsubscribed = 'ALREADY_UNSUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UnsubscribeMethodNotFound = 'UNSUBSCRIBE_METHOD_NOT_FOUND'
}

export type UnsubscribeResult = UnsubscribeError | UnsubscribeSuccess;

export type UnsubscribeSuccess = {
  __typename?: 'UnsubscribeSuccess';
  subscription: Subscription;
};

export type UpdateEmailError = {
  __typename?: 'UpdateEmailError';
  errorCodes: Array<UpdateEmailErrorCode>;
};

export enum UpdateEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateEmailResult = UpdateEmailError | UpdateEmailSuccess;

export type UpdateEmailSuccess = {
  __typename?: 'UpdateEmailSuccess';
  email: Scalars['String']['output'];
  verificationEmailSent?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateFilterError = {
  __typename?: 'UpdateFilterError';
  errorCodes: Array<UpdateFilterErrorCode>;
};

export enum UpdateFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFilterResult = UpdateFilterError | UpdateFilterSuccess;

export type UpdateFilterSuccess = {
  __typename?: 'UpdateFilterSuccess';
  filter: Filter;
};

export type UpdateFolderPolicyError = {
  __typename?: 'UpdateFolderPolicyError';
  errorCodes: Array<UpdateFolderPolicyErrorCode>;
};

export enum UpdateFolderPolicyErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateFolderPolicyInput = {
  action?: InputMaybe<FolderPolicyAction>;
  afterDays?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateFolderPolicyResult = UpdateFolderPolicyError | UpdateFolderPolicySuccess;

export type UpdateFolderPolicySuccess = {
  __typename?: 'UpdateFolderPolicySuccess';
  policy: FolderPolicy;
};

export type UpdateHighlightError = {
  __typename?: 'UpdateHighlightError';
  errorCodes: Array<UpdateHighlightErrorCode>;
};

export enum UpdateHighlightErrorCode {
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  highlightId: Scalars['ID']['input'];
  html?: InputMaybe<Scalars['String']['input']>;
  quote?: InputMaybe<Scalars['String']['input']>;
  sharedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateHighlightReplyError = {
  __typename?: 'UpdateHighlightReplyError';
  errorCodes: Array<UpdateHighlightReplyErrorCode>;
};

export enum UpdateHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateHighlightReplyInput = {
  highlightReplyId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type UpdateHighlightReplyResult = UpdateHighlightReplyError | UpdateHighlightReplySuccess;

export type UpdateHighlightReplySuccess = {
  __typename?: 'UpdateHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type UpdateHighlightResult = UpdateHighlightError | UpdateHighlightSuccess;

export type UpdateHighlightSuccess = {
  __typename?: 'UpdateHighlightSuccess';
  highlight: Highlight;
};

export type UpdateLabelError = {
  __typename?: 'UpdateLabelError';
  errorCodes: Array<UpdateLabelErrorCode>;
};

export enum UpdateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateLabelInput = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  labelId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateLabelResult = UpdateLabelError | UpdateLabelSuccess;

export type UpdateLabelSuccess = {
  __typename?: 'UpdateLabelSuccess';
  label: Label;
};

export type UpdateLinkShareInfoError = {
  __typename?: 'UpdateLinkShareInfoError';
  errorCodes: Array<UpdateLinkShareInfoErrorCode>;
};

export enum UpdateLinkShareInfoErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateLinkShareInfoInput = {
  description: Scalars['String']['input'];
  linkId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateLinkShareInfoResult = UpdateLinkShareInfoError | UpdateLinkShareInfoSuccess;

export type UpdateLinkShareInfoSuccess = {
  __typename?: 'UpdateLinkShareInfoSuccess';
  message: Scalars['String']['output'];
};

export type UpdateNewsletterEmailError = {
  __typename?: 'UpdateNewsletterEmailError';
  errorCodes: Array<UpdateNewsletterEmailErrorCode>;
};

export enum UpdateNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateNewsletterEmailInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNewsletterEmailResult = UpdateNewsletterEmailError | UpdateNewsletterEmailSuccess;

export type UpdateNewsletterEmailSuccess = {
  __typename?: 'UpdateNewsletterEmailSuccess';
  newsletterEmail: NewsletterEmail;
};

export type UpdatePageError = {
  __typename?: 'UpdatePageError';
  errorCodes: Array<UpdatePageErrorCode>;
};

export enum UpdatePageErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UpdateFailed = 'UPDATE_FAILED'
}

export type UpdatePageInput = {
  byline?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  state?: InputMaybe<ArticleSavingRequestStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePageResult = UpdatePageError | UpdatePageSuccess;

export type UpdatePageSuccess = {
  __typename?: 'UpdatePageSuccess';
  updatedPage: Article;
};

export type UpdatePostError = {
  __typename?: 'UpdatePostError';
  errorCodes: Array<UpdatePostErrorCode>;
};

export enum UpdatePostErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  highlightIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  libraryItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  thought?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostResult = UpdatePostError | UpdatePostSuccess;

export type UpdatePostSuccess = {
  __typename?: 'UpdatePostSuccess';
  post: Post;
};

export enum UpdateReason {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export type UpdateReminderError = {
  __typename?: 'UpdateReminderError';
  errorCodes: Array<UpdateReminderErrorCode>;
};

export enum UpdateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateReminderInput = {
  archiveUntil: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  remindAt: Scalars['Date']['input'];
  sendNotification: Scalars['Boolean']['input'];
};

export type UpdateReminderResult = UpdateReminderError | UpdateReminderSuccess;

export type UpdateReminderSuccess = {
  __typename?: 'UpdateReminderSuccess';
  reminder: Reminder;
};

export type UpdateSharedCommentError = {
  __typename?: 'UpdateSharedCommentError';
  errorCodes: Array<UpdateSharedCommentErrorCode>;
};

export enum UpdateSharedCommentErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateSharedCommentInput = {
  articleID: Scalars['ID']['input'];
  sharedComment: Scalars['String']['input'];
};

export type UpdateSharedCommentResult = UpdateSharedCommentError | UpdateSharedCommentSuccess;

export type UpdateSharedCommentSuccess = {
  __typename?: 'UpdateSharedCommentSuccess';
  articleID: Scalars['ID']['output'];
  sharedComment: Scalars['String']['output'];
};

export type UpdateSubscriptionError = {
  __typename?: 'UpdateSubscriptionError';
  errorCodes: Array<UpdateSubscriptionErrorCode>;
};

export enum UpdateSubscriptionErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateSubscriptionInput = {
  autoAddToLibrary?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failedAt?: InputMaybe<Scalars['Date']['input']>;
  fetchContent?: InputMaybe<Scalars['Boolean']['input']>;
  fetchContentType?: InputMaybe<FetchContentType>;
  folder?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  lastFetchedChecksum?: InputMaybe<Scalars['String']['input']>;
  mostRecentItemDate?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  refreshedAt?: InputMaybe<Scalars['Date']['input']>;
  scheduledAt?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<SubscriptionStatus>;
};

export type UpdateSubscriptionResult = UpdateSubscriptionError | UpdateSubscriptionSuccess;

export type UpdateSubscriptionSuccess = {
  __typename?: 'UpdateSubscriptionSuccess';
  subscription: Subscription;
};

export type UpdateUserError = {
  __typename?: 'UpdateUserError';
  errorCodes: Array<UpdateUserErrorCode>;
};

export enum UpdateUserErrorCode {
  BioTooLong = 'BIO_TOO_LONG',
  EmptyName = 'EMPTY_NAME',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateUserProfileError = {
  __typename?: 'UpdateUserProfileError';
  errorCodes: Array<UpdateUserProfileErrorCode>;
};

export enum UpdateUserProfileErrorCode {
  BadData = 'BAD_DATA',
  BadUsername = 'BAD_USERNAME',
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UsernameExists = 'USERNAME_EXISTS'
}

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileResult = UpdateUserProfileError | UpdateUserProfileSuccess;

export type UpdateUserProfileSuccess = {
  __typename?: 'UpdateUserProfileSuccess';
  user: User;
};

export type UpdateUserResult = UpdateUserError | UpdateUserSuccess;

export type UpdateUserSuccess = {
  __typename?: 'UpdateUserSuccess';
  user: User;
};

export type UpdatesSinceError = {
  __typename?: 'UpdatesSinceError';
  errorCodes: Array<UpdatesSinceErrorCode>;
};

export enum UpdatesSinceErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdatesSinceResult = UpdatesSinceError | UpdatesSinceSuccess;

export type UpdatesSinceSuccess = {
  __typename?: 'UpdatesSinceSuccess';
  edges: Array<SyncUpdatedItemEdge>;
  pageInfo: PageInfo;
};

export type UploadFileRequestError = {
  __typename?: 'UploadFileRequestError';
  errorCodes: Array<UploadFileRequestErrorCode>;
};

export enum UploadFileRequestErrorCode {
  BadInput = 'BAD_INPUT',
  FailedCreate = 'FAILED_CREATE',
  Unauthorized = 'UNAUTHORIZED'
}

export type UploadFileRequestInput = {
  clientRequestId?: InputMaybe<Scalars['String']['input']>;
  contentType: Scalars['String']['input'];
  createPageEntry?: InputMaybe<Scalars['Boolean']['input']>;
  url: Scalars['String']['input'];
};

export type UploadFileRequestResult = UploadFileRequestError | UploadFileRequestSuccess;

export type UploadFileRequestSuccess = {
  __typename?: 'UploadFileRequestSuccess';
  createdPageId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  uploadSignedUrl?: Maybe<Scalars['String']['output']>;
};

export enum UploadFileStatus {
  Completed = 'COMPLETED',
  Initialized = 'INITIALIZED'
}

export type UploadImportFileError = {
  __typename?: 'UploadImportFileError';
  errorCodes: Array<UploadImportFileErrorCode>;
};

export enum UploadImportFileErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  UploadDailyLimitExceeded = 'UPLOAD_DAILY_LIMIT_EXCEEDED'
}

export type UploadImportFileResult = UploadImportFileError | UploadImportFileSuccess;

export type UploadImportFileSuccess = {
  __typename?: 'UploadImportFileSuccess';
  uploadSignedUrl?: Maybe<Scalars['String']['output']>;
};

export enum UploadImportFileType {
  Matter = 'MATTER',
  Pocket = 'POCKET',
  UrlList = 'URL_LIST'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  featureList?: Maybe<Array<Feature>>;
  features?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  friendsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  intercomHash?: Maybe<Scalars['String']['output']>;
  /** @deprecated isFriend has been replaced with viewerIsFollowing */
  isFriend?: Maybe<Scalars['Boolean']['output']>;
  isFullUser?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  sharedArticles: Array<FeedArticle>;
  sharedArticlesCount?: Maybe<Scalars['Int']['output']>;
  sharedHighlightsCount?: Maybe<Scalars['Int']['output']>;
  sharedNotesCount?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  viewerIsFollowing?: Maybe<Scalars['Boolean']['output']>;
};

export type UserError = {
  __typename?: 'UserError';
  errorCodes: Array<UserErrorCode>;
};

export enum UserErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type UserPersonalization = {
  __typename?: 'UserPersonalization';
  autoTranslate?: Maybe<Scalars['Boolean']['output']>;
  digestConfig?: Maybe<DigestConfig>;
  fields?: Maybe<Scalars['JSON']['output']>;
  fontFamily?: Maybe<Scalars['String']['output']>;
  fontSize?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  libraryLayoutType?: Maybe<Scalars['String']['output']>;
  librarySortOrder?: Maybe<SortOrder>;
  margin?: Maybe<Scalars['Int']['output']>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  speechRate?: Maybe<Scalars['String']['output']>;
  speechSecondaryVoice?: Maybe<Scalars['String']['output']>;
  speechVoice?: Maybe<Scalars['String']['output']>;
  speechVolume?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};

export type UserResult = UserError | UserSuccess;

export type UserSuccess = {
  __typename?: 'UserSuccess';
  user: User;
};

export type UsersError = {
  __typename?: 'UsersError';
  errorCodes: Array<UsersErrorCode>;
};

export enum UsersErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type UsersResult = UsersError | UsersSuccess;

export type UsersSuccess = {
  __typename?: 'UsersSuccess';
  users: Array<User>;
};

export type Webhook = {
  __typename?: 'Webhook';
  contentType: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  eventTypes: Array<WebhookEvent>;
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type WebhookError = {
  __typename?: 'WebhookError';
  errorCodes: Array<WebhookErrorCode>;
};

export enum WebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export enum WebhookEvent {
  HighlightCreated = 'HIGHLIGHT_CREATED',
  HighlightDeleted = 'HIGHLIGHT_DELETED',
  HighlightUpdated = 'HIGHLIGHT_UPDATED',
  LabelCreated = 'LABEL_CREATED',
  LabelDeleted = 'LABEL_DELETED',
  LabelUpdated = 'LABEL_UPDATED',
  PageCreated = 'PAGE_CREATED',
  PageDeleted = 'PAGE_DELETED',
  PageUpdated = 'PAGE_UPDATED'
}

export type WebhookResult = WebhookError | WebhookSuccess;

export type WebhookSuccess = {
  __typename?: 'WebhookSuccess';
  webhook: Webhook;
};

export type WebhooksError = {
  __typename?: 'WebhooksError';
  errorCodes: Array<WebhooksErrorCode>;
};

export enum WebhooksErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type WebhooksResult = WebhooksError | WebhooksSuccess;

export type WebhooksSuccess = {
  __typename?: 'WebhooksSuccess';
  webhooks: Array<Webhook>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AddDiscoverFeedResult: ( AddDiscoverFeedError ) | ( AddDiscoverFeedSuccess );
  AddPopularReadResult: ( AddPopularReadError ) | ( AddPopularReadSuccess );
  AnkiCardBatchesResult: ( AnkiCardBatchesError ) | ( AnkiCardBatchesSuccess );
  AnkiCardsResult: ( AnkiCardsError ) | ( AnkiCardsSuccess );
  AnkiIntegrationResult: ( AnkiIntegrationError ) | ( AnkiIntegrationSuccess );
  ApiKeysResult: ( ApiKeysError ) | ( ApiKeysSuccess );
  ArchiveLinkResult: ( ArchiveLinkError ) | ( ArchiveLinkSuccess );
  ArticleResult: ( ArticleError ) | ( ArticleSuccess );
  ArticleSavingRequestResult: ( ArticleSavingRequestError ) | ( ArticleSavingRequestSuccess );
  ArticlesResult: ( ArticlesError ) | ( ArticlesSuccess );
  BulkActionResult: ( BulkActionError ) | ( BulkActionSuccess );
  CreateArticleResult: ( CreateArticleError ) | ( CreateArticleSuccess );
  CreateArticleSavingRequestResult: ( CreateArticleSavingRequestError ) | ( CreateArticleSavingRequestSuccess );
  CreateFolderPolicyResult: ( CreateFolderPolicyError ) | ( CreateFolderPolicySuccess );
  CreateGroupResult: ( CreateGroupError ) | ( CreateGroupSuccess );
  CreateHighlightReplyResult: ( CreateHighlightReplyError ) | ( CreateHighlightReplySuccess );
  CreateHighlightResult: ( CreateHighlightError ) | ( CreateHighlightSuccess );
  CreateLabelResult: ( CreateLabelError ) | ( CreateLabelSuccess );
  CreateNewsletterEmailResult: ( CreateNewsletterEmailError ) | ( CreateNewsletterEmailSuccess );
  CreatePostResult: ( CreatePostError ) | ( CreatePostSuccess );
  CreateReactionResult: ( CreateReactionError ) | ( CreateReactionSuccess );
  CreateReminderResult: ( CreateReminderError ) | ( CreateReminderSuccess );
  DeleteAccountResult: ( DeleteAccountError ) | ( DeleteAccountSuccess );
  DeleteDiscoverArticleResult: ( DeleteDiscoverArticleError ) | ( DeleteDiscoverArticleSuccess );
  DeleteDiscoverFeedResult: ( DeleteDiscoverFeedError ) | ( DeleteDiscoverFeedSuccess );
  DeleteFilterResult: ( DeleteFilterError ) | ( DeleteFilterSuccess );
  DeleteFolderPolicyResult: ( DeleteFolderPolicyError ) | ( DeleteFolderPolicySuccess );
  DeleteHighlightReplyResult: ( DeleteHighlightReplyError ) | ( DeleteHighlightReplySuccess );
  DeleteHighlightResult: ( DeleteHighlightError ) | ( DeleteHighlightSuccess );
  DeleteIntegrationResult: ( DeleteIntegrationError ) | ( DeleteIntegrationSuccess );
  DeleteLabelResult: ( DeleteLabelError ) | ( DeleteLabelSuccess );
  DeleteNewsletterEmailResult: ( DeleteNewsletterEmailError ) | ( DeleteNewsletterEmailSuccess );
  DeletePostResult: ( DeletePostError ) | ( DeletePostSuccess );
  DeleteReactionResult: ( DeleteReactionError ) | ( DeleteReactionSuccess );
  DeleteReminderResult: ( DeleteReminderError ) | ( DeleteReminderSuccess );
  DeleteRuleResult: ( DeleteRuleError ) | ( DeleteRuleSuccess );
  DeleteWebhookResult: ( DeleteWebhookError ) | ( DeleteWebhookSuccess );
  DeviceTokensResult: ( DeviceTokensError ) | ( DeviceTokensSuccess );
  DiscoverFeedResult: ( DiscoverFeedError ) | ( DiscoverFeedSuccess );
  EditDiscoverFeedResult: ( EditDiscoverFeedError ) | ( EditDiscoverFeedSuccess );
  EmptyTrashResult: ( EmptyTrashError ) | ( EmptyTrashSuccess );
  ExportToIntegrationResult: ( ExportToIntegrationError ) | ( ExportToIntegrationSuccess );
  FeedArticlesResult: ( FeedArticlesError ) | ( FeedArticlesSuccess );
  FeedsResult: ( FeedsError ) | ( FeedsSuccess );
  FetchContentResult: ( FetchContentError ) | ( FetchContentSuccess );
  FiltersResult: ( FiltersError ) | ( FiltersSuccess );
  FolderPoliciesResult: ( FolderPoliciesError ) | ( FolderPoliciesSuccess );
  GenerateAnkiCardsBatchResult: ( GenerateAnkiCardsBatchError ) | ( GenerateAnkiCardsBatchSuccess );
  GenerateAnkiCardsResult: ( GenerateAnkiCardsError ) | ( GenerateAnkiCardsSuccess );
  GenerateApiKeyResult: ( GenerateApiKeyError ) | ( GenerateApiKeySuccess );
  GetDiscoverFeedArticleResults: ( GetDiscoverFeedArticleError ) | ( GetDiscoverFeedArticleSuccess );
  GetDiscoverTopicResults: ( GetDiscoverTopicError ) | ( GetDiscoverTopicSuccess );
  GetFollowersResult: ( GetFollowersError ) | ( GetFollowersSuccess );
  GetFollowingResult: ( GetFollowingError ) | ( GetFollowingSuccess );
  GetUserPersonalizationResult: ( GetUserPersonalizationError ) | ( GetUserPersonalizationSuccess );
  GoogleSignupResult: ( GoogleSignupError ) | ( GoogleSignupSuccess );
  GroupsResult: ( GroupsError ) | ( GroupsSuccess );
  HiddenHomeSectionResult: ( HiddenHomeSectionError ) | ( HiddenHomeSectionSuccess );
  HighlightsResult: ( HighlightsError ) | ( HighlightsSuccess );
  HomeResult: ( HomeError ) | ( HomeSuccess );
  ImportFromIntegrationResult: ( ImportFromIntegrationError ) | ( ImportFromIntegrationSuccess );
  IntegrationResult: ( IntegrationError ) | ( IntegrationSuccess );
  IntegrationsResult: ( IntegrationsError ) | ( IntegrationsSuccess );
  JoinGroupResult: ( JoinGroupError ) | ( JoinGroupSuccess );
  LabelsResult: ( LabelsError ) | ( LabelsSuccess );
  LeaveGroupResult: ( LeaveGroupError ) | ( LeaveGroupSuccess );
  LogOutResult: ( LogOutError ) | ( LogOutSuccess );
  LoginResult: ( LoginError ) | ( LoginSuccess );
  MarkEmailAsItemResult: ( MarkEmailAsItemError ) | ( MarkEmailAsItemSuccess );
  MergeHighlightResult: ( MergeHighlightError ) | ( MergeHighlightSuccess );
  MoveFilterResult: ( MoveFilterError ) | ( MoveFilterSuccess );
  MoveLabelResult: ( MoveLabelError ) | ( MoveLabelSuccess );
  MoveToFolderResult: ( MoveToFolderError ) | ( MoveToFolderSuccess );
  NewsletterEmailsResult: ( NewsletterEmailsError ) | ( NewsletterEmailsSuccess );
  OptInFeatureResult: ( OptInFeatureError ) | ( OptInFeatureSuccess );
  PostResult: ( PostError ) | ( PostSuccess );
  PostsResult: ( PostsError ) | ( PostsSuccess );
  RecentEmailsResult: ( RecentEmailsError ) | ( RecentEmailsSuccess );
  RecentSearchesResult: ( RecentSearchesError ) | ( RecentSearchesSuccess );
  RecommendHighlightsResult: ( RecommendHighlightsError ) | ( RecommendHighlightsSuccess );
  RecommendResult: ( RecommendError ) | ( RecommendSuccess );
  RefreshHomeResult: ( RefreshHomeError ) | ( RefreshHomeSuccess );
  RegenerateAnkiCardsResult: ( RegenerateAnkiCardsError ) | ( RegenerateAnkiCardsSuccess );
  ReminderResult: ( ReminderError ) | ( ReminderSuccess );
  ReplyToEmailResult: ( ReplyToEmailError ) | ( ReplyToEmailSuccess );
  RevokeApiKeyResult: ( RevokeApiKeyError ) | ( RevokeApiKeySuccess );
  RulesResult: ( RulesError ) | ( RulesSuccess );
  SaveArticleReadingProgressResult: ( SaveArticleReadingProgressError ) | ( SaveArticleReadingProgressSuccess );
  SaveDiscoverArticleResult: ( SaveDiscoverArticleError ) | ( SaveDiscoverArticleSuccess );
  SaveFilterResult: ( SaveFilterError ) | ( SaveFilterSuccess );
  SaveResult: ( SaveError ) | ( SaveSuccess );
  ScanFeedsResult: ( ScanFeedsError ) | ( ScanFeedsSuccess );
  SearchResult: ( SearchError ) | ( SearchSuccess );
  SendInstallInstructionsResult: ( SendInstallInstructionsError ) | ( SendInstallInstructionsSuccess );
  SetBookmarkArticleResult: ( SetBookmarkArticleError ) | ( SetBookmarkArticleSuccess );
  SetDeviceTokenResult: ( SetDeviceTokenError ) | ( SetDeviceTokenSuccess );
  SetFavoriteArticleResult: ( SetFavoriteArticleError ) | ( SetFavoriteArticleSuccess );
  SetFollowResult: ( SetFollowError ) | ( SetFollowSuccess );
  SetIntegrationResult: ( SetIntegrationError ) | ( SetIntegrationSuccess );
  SetLabelsResult: ( SetLabelsError ) | ( SetLabelsSuccess );
  SetRuleResult: ( SetRuleError ) | ( SetRuleSuccess );
  SetShareArticleResult: ( SetShareArticleError ) | ( SetShareArticleSuccess );
  SetShareHighlightResult: ( SetShareHighlightError ) | ( SetShareHighlightSuccess );
  SetShowTranslatedResult: ( SetShowTranslatedError ) | ( SetShowTranslatedSuccess );
  SetUserPersonalizationResult: ( SetUserPersonalizationError ) | ( SetUserPersonalizationSuccess );
  SetWebhookResult: ( SetWebhookError ) | ( SetWebhookSuccess );
  SharedArticleResult: ( SharedArticleError ) | ( SharedArticleSuccess );
  SubscribeResult: ( SubscribeError ) | ( SubscribeSuccess );
  SubscriptionResult: ( SubscriptionError ) | ( SubscriptionSuccess );
  SubscriptionsResult: ( SubscriptionsError ) | ( SubscriptionsSuccess );
  TestAnkiConnectionResult: ( TestAnkiConnectionError ) | ( TestAnkiConnectionSuccess );
  TypeaheadSearchResult: ( TypeaheadSearchError ) | ( TypeaheadSearchSuccess );
  UnsubscribeResult: ( UnsubscribeError ) | ( UnsubscribeSuccess );
  UpdateEmailResult: ( UpdateEmailError ) | ( UpdateEmailSuccess );
  UpdateFilterResult: ( UpdateFilterError ) | ( UpdateFilterSuccess );
  UpdateFolderPolicyResult: ( UpdateFolderPolicyError ) | ( UpdateFolderPolicySuccess );
  UpdateHighlightReplyResult: ( UpdateHighlightReplyError ) | ( UpdateHighlightReplySuccess );
  UpdateHighlightResult: ( UpdateHighlightError ) | ( UpdateHighlightSuccess );
  UpdateLabelResult: ( UpdateLabelError ) | ( UpdateLabelSuccess );
  UpdateLinkShareInfoResult: ( UpdateLinkShareInfoError ) | ( UpdateLinkShareInfoSuccess );
  UpdateNewsletterEmailResult: ( UpdateNewsletterEmailError ) | ( UpdateNewsletterEmailSuccess );
  UpdatePageResult: ( UpdatePageError ) | ( UpdatePageSuccess );
  UpdatePostResult: ( UpdatePostError ) | ( UpdatePostSuccess );
  UpdateReminderResult: ( UpdateReminderError ) | ( UpdateReminderSuccess );
  UpdateSharedCommentResult: ( UpdateSharedCommentError ) | ( UpdateSharedCommentSuccess );
  UpdateSubscriptionResult: ( UpdateSubscriptionError ) | ( UpdateSubscriptionSuccess );
  UpdateUserProfileResult: ( UpdateUserProfileError ) | ( UpdateUserProfileSuccess );
  UpdateUserResult: ( UpdateUserError ) | ( UpdateUserSuccess );
  UpdatesSinceResult: ( UpdatesSinceError ) | ( UpdatesSinceSuccess );
  UploadFileRequestResult: ( UploadFileRequestError ) | ( UploadFileRequestSuccess );
  UploadImportFileResult: ( UploadImportFileError ) | ( UploadImportFileSuccess );
  UserResult: ( UserError ) | ( UserSuccess );
  UsersResult: ( UsersError ) | ( UsersSuccess );
  WebhookResult: ( WebhookError ) | ( WebhookSuccess );
  WebhooksResult: ( WebhooksError ) | ( WebhooksSuccess );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddDiscoverFeedError: ResolverTypeWrapper<AddDiscoverFeedError>;
  AddDiscoverFeedErrorCode: AddDiscoverFeedErrorCode;
  AddDiscoverFeedInput: AddDiscoverFeedInput;
  AddDiscoverFeedResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AddDiscoverFeedResult']>;
  AddDiscoverFeedSuccess: ResolverTypeWrapper<AddDiscoverFeedSuccess>;
  AddPopularReadError: ResolverTypeWrapper<AddPopularReadError>;
  AddPopularReadErrorCode: AddPopularReadErrorCode;
  AddPopularReadResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AddPopularReadResult']>;
  AddPopularReadSuccess: ResolverTypeWrapper<AddPopularReadSuccess>;
  AllowedReply: AllowedReply;
  AnkiCardBatch: ResolverTypeWrapper<AnkiCardBatch>;
  AnkiCardBatchesError: ResolverTypeWrapper<AnkiCardBatchesError>;
  AnkiCardBatchesErrorCode: AnkiCardBatchesErrorCode;
  AnkiCardBatchesInput: AnkiCardBatchesInput;
  AnkiCardBatchesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AnkiCardBatchesResult']>;
  AnkiCardBatchesSuccess: ResolverTypeWrapper<AnkiCardBatchesSuccess>;
  AnkiCardDetail: ResolverTypeWrapper<AnkiCardDetail>;
  AnkiCardStatus: AnkiCardStatus;
  AnkiCardsError: ResolverTypeWrapper<AnkiCardsError>;
  AnkiCardsErrorCode: AnkiCardsErrorCode;
  AnkiCardsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AnkiCardsResult']>;
  AnkiCardsSuccess: ResolverTypeWrapper<AnkiCardsSuccess>;
  AnkiIntegrationError: ResolverTypeWrapper<AnkiIntegrationError>;
  AnkiIntegrationErrorCode: AnkiIntegrationErrorCode;
  AnkiIntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AnkiIntegrationResult']>;
  AnkiIntegrationSuccess: ResolverTypeWrapper<AnkiIntegrationSuccess>;
  ApiKey: ResolverTypeWrapper<ApiKey>;
  ApiKeysError: ResolverTypeWrapper<ApiKeysError>;
  ApiKeysErrorCode: ApiKeysErrorCode;
  ApiKeysResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ApiKeysResult']>;
  ApiKeysSuccess: ResolverTypeWrapper<ApiKeysSuccess>;
  ArchiveLinkError: ResolverTypeWrapper<ArchiveLinkError>;
  ArchiveLinkErrorCode: ArchiveLinkErrorCode;
  ArchiveLinkInput: ArchiveLinkInput;
  ArchiveLinkResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ArchiveLinkResult']>;
  ArchiveLinkSuccess: ResolverTypeWrapper<ArchiveLinkSuccess>;
  Article: ResolverTypeWrapper<Article>;
  ArticleEdge: ResolverTypeWrapper<ArticleEdge>;
  ArticleError: ResolverTypeWrapper<ArticleError>;
  ArticleErrorCode: ArticleErrorCode;
  ArticleHighlightsInput: ArticleHighlightsInput;
  ArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ArticleResult']>;
  ArticleSavingRequest: ResolverTypeWrapper<ArticleSavingRequest>;
  ArticleSavingRequestError: ResolverTypeWrapper<ArticleSavingRequestError>;
  ArticleSavingRequestErrorCode: ArticleSavingRequestErrorCode;
  ArticleSavingRequestResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ArticleSavingRequestResult']>;
  ArticleSavingRequestStatus: ArticleSavingRequestStatus;
  ArticleSavingRequestSuccess: ResolverTypeWrapper<ArticleSavingRequestSuccess>;
  ArticleSuccess: ResolverTypeWrapper<ArticleSuccess>;
  ArticlesError: ResolverTypeWrapper<ArticlesError>;
  ArticlesErrorCode: ArticlesErrorCode;
  ArticlesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ArticlesResult']>;
  ArticlesSuccess: ResolverTypeWrapper<ArticlesSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BulkActionError: ResolverTypeWrapper<BulkActionError>;
  BulkActionErrorCode: BulkActionErrorCode;
  BulkActionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['BulkActionResult']>;
  BulkActionSuccess: ResolverTypeWrapper<BulkActionSuccess>;
  BulkActionType: BulkActionType;
  ContentReader: ContentReader;
  CreateArticleError: ResolverTypeWrapper<CreateArticleError>;
  CreateArticleErrorCode: CreateArticleErrorCode;
  CreateArticleInput: CreateArticleInput;
  CreateArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateArticleResult']>;
  CreateArticleSavingRequestError: ResolverTypeWrapper<CreateArticleSavingRequestError>;
  CreateArticleSavingRequestErrorCode: CreateArticleSavingRequestErrorCode;
  CreateArticleSavingRequestInput: CreateArticleSavingRequestInput;
  CreateArticleSavingRequestResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateArticleSavingRequestResult']>;
  CreateArticleSavingRequestSuccess: ResolverTypeWrapper<CreateArticleSavingRequestSuccess>;
  CreateArticleSuccess: ResolverTypeWrapper<CreateArticleSuccess>;
  CreateFolderPolicyError: ResolverTypeWrapper<CreateFolderPolicyError>;
  CreateFolderPolicyErrorCode: CreateFolderPolicyErrorCode;
  CreateFolderPolicyInput: CreateFolderPolicyInput;
  CreateFolderPolicyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateFolderPolicyResult']>;
  CreateFolderPolicySuccess: ResolverTypeWrapper<CreateFolderPolicySuccess>;
  CreateGroupError: ResolverTypeWrapper<CreateGroupError>;
  CreateGroupErrorCode: CreateGroupErrorCode;
  CreateGroupInput: CreateGroupInput;
  CreateGroupResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateGroupResult']>;
  CreateGroupSuccess: ResolverTypeWrapper<CreateGroupSuccess>;
  CreateHighlightError: ResolverTypeWrapper<CreateHighlightError>;
  CreateHighlightErrorCode: CreateHighlightErrorCode;
  CreateHighlightInput: CreateHighlightInput;
  CreateHighlightReplyError: ResolverTypeWrapper<CreateHighlightReplyError>;
  CreateHighlightReplyErrorCode: CreateHighlightReplyErrorCode;
  CreateHighlightReplyInput: CreateHighlightReplyInput;
  CreateHighlightReplyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateHighlightReplyResult']>;
  CreateHighlightReplySuccess: ResolverTypeWrapper<CreateHighlightReplySuccess>;
  CreateHighlightResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateHighlightResult']>;
  CreateHighlightSuccess: ResolverTypeWrapper<CreateHighlightSuccess>;
  CreateLabelError: ResolverTypeWrapper<CreateLabelError>;
  CreateLabelErrorCode: CreateLabelErrorCode;
  CreateLabelInput: CreateLabelInput;
  CreateLabelResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateLabelResult']>;
  CreateLabelSuccess: ResolverTypeWrapper<CreateLabelSuccess>;
  CreateNewsletterEmailError: ResolverTypeWrapper<CreateNewsletterEmailError>;
  CreateNewsletterEmailErrorCode: CreateNewsletterEmailErrorCode;
  CreateNewsletterEmailInput: CreateNewsletterEmailInput;
  CreateNewsletterEmailResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateNewsletterEmailResult']>;
  CreateNewsletterEmailSuccess: ResolverTypeWrapper<CreateNewsletterEmailSuccess>;
  CreatePostError: ResolverTypeWrapper<CreatePostError>;
  CreatePostErrorCode: CreatePostErrorCode;
  CreatePostInput: CreatePostInput;
  CreatePostResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreatePostResult']>;
  CreatePostSuccess: ResolverTypeWrapper<CreatePostSuccess>;
  CreateReactionError: ResolverTypeWrapper<CreateReactionError>;
  CreateReactionErrorCode: CreateReactionErrorCode;
  CreateReactionInput: CreateReactionInput;
  CreateReactionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateReactionResult']>;
  CreateReactionSuccess: ResolverTypeWrapper<CreateReactionSuccess>;
  CreateReminderError: ResolverTypeWrapper<CreateReminderError>;
  CreateReminderErrorCode: CreateReminderErrorCode;
  CreateReminderInput: CreateReminderInput;
  CreateReminderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateReminderResult']>;
  CreateReminderSuccess: ResolverTypeWrapper<CreateReminderSuccess>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteAccountError: ResolverTypeWrapper<DeleteAccountError>;
  DeleteAccountErrorCode: DeleteAccountErrorCode;
  DeleteAccountResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteAccountResult']>;
  DeleteAccountSuccess: ResolverTypeWrapper<DeleteAccountSuccess>;
  DeleteDiscoverArticleError: ResolverTypeWrapper<DeleteDiscoverArticleError>;
  DeleteDiscoverArticleErrorCode: DeleteDiscoverArticleErrorCode;
  DeleteDiscoverArticleInput: DeleteDiscoverArticleInput;
  DeleteDiscoverArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteDiscoverArticleResult']>;
  DeleteDiscoverArticleSuccess: ResolverTypeWrapper<DeleteDiscoverArticleSuccess>;
  DeleteDiscoverFeedError: ResolverTypeWrapper<DeleteDiscoverFeedError>;
  DeleteDiscoverFeedErrorCode: DeleteDiscoverFeedErrorCode;
  DeleteDiscoverFeedInput: DeleteDiscoverFeedInput;
  DeleteDiscoverFeedResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteDiscoverFeedResult']>;
  DeleteDiscoverFeedSuccess: ResolverTypeWrapper<DeleteDiscoverFeedSuccess>;
  DeleteFilterError: ResolverTypeWrapper<DeleteFilterError>;
  DeleteFilterErrorCode: DeleteFilterErrorCode;
  DeleteFilterResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteFilterResult']>;
  DeleteFilterSuccess: ResolverTypeWrapper<DeleteFilterSuccess>;
  DeleteFolderPolicyError: ResolverTypeWrapper<DeleteFolderPolicyError>;
  DeleteFolderPolicyErrorCode: DeleteFolderPolicyErrorCode;
  DeleteFolderPolicyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteFolderPolicyResult']>;
  DeleteFolderPolicySuccess: ResolverTypeWrapper<DeleteFolderPolicySuccess>;
  DeleteHighlightError: ResolverTypeWrapper<DeleteHighlightError>;
  DeleteHighlightErrorCode: DeleteHighlightErrorCode;
  DeleteHighlightReplyError: ResolverTypeWrapper<DeleteHighlightReplyError>;
  DeleteHighlightReplyErrorCode: DeleteHighlightReplyErrorCode;
  DeleteHighlightReplyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteHighlightReplyResult']>;
  DeleteHighlightReplySuccess: ResolverTypeWrapper<DeleteHighlightReplySuccess>;
  DeleteHighlightResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteHighlightResult']>;
  DeleteHighlightSuccess: ResolverTypeWrapper<DeleteHighlightSuccess>;
  DeleteIntegrationError: ResolverTypeWrapper<DeleteIntegrationError>;
  DeleteIntegrationErrorCode: DeleteIntegrationErrorCode;
  DeleteIntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteIntegrationResult']>;
  DeleteIntegrationSuccess: ResolverTypeWrapper<DeleteIntegrationSuccess>;
  DeleteLabelError: ResolverTypeWrapper<DeleteLabelError>;
  DeleteLabelErrorCode: DeleteLabelErrorCode;
  DeleteLabelResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteLabelResult']>;
  DeleteLabelSuccess: ResolverTypeWrapper<DeleteLabelSuccess>;
  DeleteNewsletterEmailError: ResolverTypeWrapper<DeleteNewsletterEmailError>;
  DeleteNewsletterEmailErrorCode: DeleteNewsletterEmailErrorCode;
  DeleteNewsletterEmailResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteNewsletterEmailResult']>;
  DeleteNewsletterEmailSuccess: ResolverTypeWrapper<DeleteNewsletterEmailSuccess>;
  DeletePostError: ResolverTypeWrapper<DeletePostError>;
  DeletePostErrorCode: DeletePostErrorCode;
  DeletePostResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeletePostResult']>;
  DeletePostSuccess: ResolverTypeWrapper<DeletePostSuccess>;
  DeleteReactionError: ResolverTypeWrapper<DeleteReactionError>;
  DeleteReactionErrorCode: DeleteReactionErrorCode;
  DeleteReactionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteReactionResult']>;
  DeleteReactionSuccess: ResolverTypeWrapper<DeleteReactionSuccess>;
  DeleteReminderError: ResolverTypeWrapper<DeleteReminderError>;
  DeleteReminderErrorCode: DeleteReminderErrorCode;
  DeleteReminderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteReminderResult']>;
  DeleteReminderSuccess: ResolverTypeWrapper<DeleteReminderSuccess>;
  DeleteRuleError: ResolverTypeWrapper<DeleteRuleError>;
  DeleteRuleErrorCode: DeleteRuleErrorCode;
  DeleteRuleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteRuleResult']>;
  DeleteRuleSuccess: ResolverTypeWrapper<DeleteRuleSuccess>;
  DeleteWebhookError: ResolverTypeWrapper<DeleteWebhookError>;
  DeleteWebhookErrorCode: DeleteWebhookErrorCode;
  DeleteWebhookResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteWebhookResult']>;
  DeleteWebhookSuccess: ResolverTypeWrapper<DeleteWebhookSuccess>;
  DeviceToken: ResolverTypeWrapper<DeviceToken>;
  DeviceTokensError: ResolverTypeWrapper<DeviceTokensError>;
  DeviceTokensErrorCode: DeviceTokensErrorCode;
  DeviceTokensResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeviceTokensResult']>;
  DeviceTokensSuccess: ResolverTypeWrapper<DeviceTokensSuccess>;
  DigestConfig: ResolverTypeWrapper<DigestConfig>;
  DigestConfigInput: DigestConfigInput;
  DirectionalityType: DirectionalityType;
  DiscoverFeed: ResolverTypeWrapper<DiscoverFeed>;
  DiscoverFeedArticle: ResolverTypeWrapper<DiscoverFeedArticle>;
  DiscoverFeedError: ResolverTypeWrapper<DiscoverFeedError>;
  DiscoverFeedErrorCode: DiscoverFeedErrorCode;
  DiscoverFeedResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DiscoverFeedResult']>;
  DiscoverFeedSuccess: ResolverTypeWrapper<DiscoverFeedSuccess>;
  DiscoverTopic: ResolverTypeWrapper<DiscoverTopic>;
  EditDiscoverFeedError: ResolverTypeWrapper<EditDiscoverFeedError>;
  EditDiscoverFeedErrorCode: EditDiscoverFeedErrorCode;
  EditDiscoverFeedInput: EditDiscoverFeedInput;
  EditDiscoverFeedResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EditDiscoverFeedResult']>;
  EditDiscoverFeedSuccess: ResolverTypeWrapper<EditDiscoverFeedSuccess>;
  EmptyTrashError: ResolverTypeWrapper<EmptyTrashError>;
  EmptyTrashErrorCode: EmptyTrashErrorCode;
  EmptyTrashResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EmptyTrashResult']>;
  EmptyTrashSuccess: ResolverTypeWrapper<EmptyTrashSuccess>;
  ErrorCode: ErrorCode;
  ExportToIntegrationError: ResolverTypeWrapper<ExportToIntegrationError>;
  ExportToIntegrationErrorCode: ExportToIntegrationErrorCode;
  ExportToIntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ExportToIntegrationResult']>;
  ExportToIntegrationSuccess: ResolverTypeWrapper<ExportToIntegrationSuccess>;
  Feature: ResolverTypeWrapper<Feature>;
  Feed: ResolverTypeWrapper<Feed>;
  FeedArticle: ResolverTypeWrapper<FeedArticle>;
  FeedArticleEdge: ResolverTypeWrapper<FeedArticleEdge>;
  FeedArticlesError: ResolverTypeWrapper<FeedArticlesError>;
  FeedArticlesErrorCode: FeedArticlesErrorCode;
  FeedArticlesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FeedArticlesResult']>;
  FeedArticlesSuccess: ResolverTypeWrapper<FeedArticlesSuccess>;
  FeedEdge: ResolverTypeWrapper<FeedEdge>;
  FeedsError: ResolverTypeWrapper<FeedsError>;
  FeedsErrorCode: FeedsErrorCode;
  FeedsInput: FeedsInput;
  FeedsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FeedsResult']>;
  FeedsSuccess: ResolverTypeWrapper<FeedsSuccess>;
  FetchContentError: ResolverTypeWrapper<FetchContentError>;
  FetchContentErrorCode: FetchContentErrorCode;
  FetchContentResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FetchContentResult']>;
  FetchContentSuccess: ResolverTypeWrapper<FetchContentSuccess>;
  FetchContentType: FetchContentType;
  Filter: ResolverTypeWrapper<Filter>;
  FiltersError: ResolverTypeWrapper<FiltersError>;
  FiltersErrorCode: FiltersErrorCode;
  FiltersResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FiltersResult']>;
  FiltersSuccess: ResolverTypeWrapper<FiltersSuccess>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FolderPoliciesError: ResolverTypeWrapper<FolderPoliciesError>;
  FolderPoliciesErrorCode: FolderPoliciesErrorCode;
  FolderPoliciesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FolderPoliciesResult']>;
  FolderPoliciesSuccess: ResolverTypeWrapper<FolderPoliciesSuccess>;
  FolderPolicy: ResolverTypeWrapper<FolderPolicy>;
  FolderPolicyAction: FolderPolicyAction;
  GenerateAnkiCardsBatchError: ResolverTypeWrapper<GenerateAnkiCardsBatchError>;
  GenerateAnkiCardsBatchErrorCode: GenerateAnkiCardsBatchErrorCode;
  GenerateAnkiCardsBatchInput: GenerateAnkiCardsBatchInput;
  GenerateAnkiCardsBatchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GenerateAnkiCardsBatchResult']>;
  GenerateAnkiCardsBatchSuccess: ResolverTypeWrapper<GenerateAnkiCardsBatchSuccess>;
  GenerateAnkiCardsError: ResolverTypeWrapper<GenerateAnkiCardsError>;
  GenerateAnkiCardsErrorCode: GenerateAnkiCardsErrorCode;
  GenerateAnkiCardsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GenerateAnkiCardsResult']>;
  GenerateAnkiCardsSuccess: ResolverTypeWrapper<GenerateAnkiCardsSuccess>;
  GenerateApiKeyError: ResolverTypeWrapper<GenerateApiKeyError>;
  GenerateApiKeyErrorCode: GenerateApiKeyErrorCode;
  GenerateApiKeyInput: GenerateApiKeyInput;
  GenerateApiKeyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GenerateApiKeyResult']>;
  GenerateApiKeySuccess: ResolverTypeWrapper<GenerateApiKeySuccess>;
  GetDiscoverFeedArticleError: ResolverTypeWrapper<GetDiscoverFeedArticleError>;
  GetDiscoverFeedArticleErrorCode: GetDiscoverFeedArticleErrorCode;
  GetDiscoverFeedArticleResults: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetDiscoverFeedArticleResults']>;
  GetDiscoverFeedArticleSuccess: ResolverTypeWrapper<GetDiscoverFeedArticleSuccess>;
  GetDiscoverTopicError: ResolverTypeWrapper<GetDiscoverTopicError>;
  GetDiscoverTopicErrorCode: GetDiscoverTopicErrorCode;
  GetDiscoverTopicResults: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetDiscoverTopicResults']>;
  GetDiscoverTopicSuccess: ResolverTypeWrapper<GetDiscoverTopicSuccess>;
  GetFollowersError: ResolverTypeWrapper<GetFollowersError>;
  GetFollowersErrorCode: GetFollowersErrorCode;
  GetFollowersResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetFollowersResult']>;
  GetFollowersSuccess: ResolverTypeWrapper<GetFollowersSuccess>;
  GetFollowingError: ResolverTypeWrapper<GetFollowingError>;
  GetFollowingErrorCode: GetFollowingErrorCode;
  GetFollowingResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetFollowingResult']>;
  GetFollowingSuccess: ResolverTypeWrapper<GetFollowingSuccess>;
  GetUserPersonalizationError: ResolverTypeWrapper<GetUserPersonalizationError>;
  GetUserPersonalizationErrorCode: GetUserPersonalizationErrorCode;
  GetUserPersonalizationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetUserPersonalizationResult']>;
  GetUserPersonalizationSuccess: ResolverTypeWrapper<GetUserPersonalizationSuccess>;
  GoogleLoginInput: GoogleLoginInput;
  GoogleSignupError: ResolverTypeWrapper<GoogleSignupError>;
  GoogleSignupInput: GoogleSignupInput;
  GoogleSignupResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GoogleSignupResult']>;
  GoogleSignupSuccess: ResolverTypeWrapper<GoogleSignupSuccess>;
  GroupsError: ResolverTypeWrapper<GroupsError>;
  GroupsErrorCode: GroupsErrorCode;
  GroupsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GroupsResult']>;
  GroupsSuccess: ResolverTypeWrapper<GroupsSuccess>;
  HiddenHomeSectionError: ResolverTypeWrapper<HiddenHomeSectionError>;
  HiddenHomeSectionErrorCode: HiddenHomeSectionErrorCode;
  HiddenHomeSectionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HiddenHomeSectionResult']>;
  HiddenHomeSectionSuccess: ResolverTypeWrapper<HiddenHomeSectionSuccess>;
  Highlight: ResolverTypeWrapper<Highlight>;
  HighlightEdge: ResolverTypeWrapper<HighlightEdge>;
  HighlightReply: ResolverTypeWrapper<HighlightReply>;
  HighlightStats: ResolverTypeWrapper<HighlightStats>;
  HighlightType: HighlightType;
  HighlightsError: ResolverTypeWrapper<HighlightsError>;
  HighlightsErrorCode: HighlightsErrorCode;
  HighlightsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HighlightsResult']>;
  HighlightsSuccess: ResolverTypeWrapper<HighlightsSuccess>;
  HomeEdge: ResolverTypeWrapper<HomeEdge>;
  HomeError: ResolverTypeWrapper<HomeError>;
  HomeErrorCode: HomeErrorCode;
  HomeItem: ResolverTypeWrapper<HomeItem>;
  HomeItemSource: ResolverTypeWrapper<HomeItemSource>;
  HomeItemSourceType: HomeItemSourceType;
  HomeResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HomeResult']>;
  HomeSection: ResolverTypeWrapper<HomeSection>;
  HomeSuccess: ResolverTypeWrapper<HomeSuccess>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImportFromIntegrationError: ResolverTypeWrapper<ImportFromIntegrationError>;
  ImportFromIntegrationErrorCode: ImportFromIntegrationErrorCode;
  ImportFromIntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ImportFromIntegrationResult']>;
  ImportFromIntegrationSuccess: ResolverTypeWrapper<ImportFromIntegrationSuccess>;
  ImportItemState: ImportItemState;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Integration: ResolverTypeWrapper<Integration>;
  IntegrationError: ResolverTypeWrapper<IntegrationError>;
  IntegrationErrorCode: IntegrationErrorCode;
  IntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['IntegrationResult']>;
  IntegrationSuccess: ResolverTypeWrapper<IntegrationSuccess>;
  IntegrationType: IntegrationType;
  IntegrationsError: ResolverTypeWrapper<IntegrationsError>;
  IntegrationsErrorCode: IntegrationsErrorCode;
  IntegrationsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['IntegrationsResult']>;
  IntegrationsSuccess: ResolverTypeWrapper<IntegrationsSuccess>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JoinGroupError: ResolverTypeWrapper<JoinGroupError>;
  JoinGroupErrorCode: JoinGroupErrorCode;
  JoinGroupResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['JoinGroupResult']>;
  JoinGroupSuccess: ResolverTypeWrapper<JoinGroupSuccess>;
  Label: ResolverTypeWrapper<Label>;
  LabelsError: ResolverTypeWrapper<LabelsError>;
  LabelsErrorCode: LabelsErrorCode;
  LabelsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LabelsResult']>;
  LabelsSuccess: ResolverTypeWrapper<LabelsSuccess>;
  LeaveGroupError: ResolverTypeWrapper<LeaveGroupError>;
  LeaveGroupErrorCode: LeaveGroupErrorCode;
  LeaveGroupResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LeaveGroupResult']>;
  LeaveGroupSuccess: ResolverTypeWrapper<LeaveGroupSuccess>;
  Link: ResolverTypeWrapper<Link>;
  LinkShareInfo: ResolverTypeWrapper<LinkShareInfo>;
  LogOutError: ResolverTypeWrapper<LogOutError>;
  LogOutErrorCode: LogOutErrorCode;
  LogOutResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LogOutResult']>;
  LogOutSuccess: ResolverTypeWrapper<LogOutSuccess>;
  LoginError: ResolverTypeWrapper<LoginError>;
  LoginErrorCode: LoginErrorCode;
  LoginResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LoginResult']>;
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>;
  MarkEmailAsItemError: ResolverTypeWrapper<MarkEmailAsItemError>;
  MarkEmailAsItemErrorCode: MarkEmailAsItemErrorCode;
  MarkEmailAsItemResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MarkEmailAsItemResult']>;
  MarkEmailAsItemSuccess: ResolverTypeWrapper<MarkEmailAsItemSuccess>;
  MergeHighlightError: ResolverTypeWrapper<MergeHighlightError>;
  MergeHighlightErrorCode: MergeHighlightErrorCode;
  MergeHighlightInput: MergeHighlightInput;
  MergeHighlightResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MergeHighlightResult']>;
  MergeHighlightSuccess: ResolverTypeWrapper<MergeHighlightSuccess>;
  MoveFilterError: ResolverTypeWrapper<MoveFilterError>;
  MoveFilterErrorCode: MoveFilterErrorCode;
  MoveFilterInput: MoveFilterInput;
  MoveFilterResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MoveFilterResult']>;
  MoveFilterSuccess: ResolverTypeWrapper<MoveFilterSuccess>;
  MoveLabelError: ResolverTypeWrapper<MoveLabelError>;
  MoveLabelErrorCode: MoveLabelErrorCode;
  MoveLabelInput: MoveLabelInput;
  MoveLabelResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MoveLabelResult']>;
  MoveLabelSuccess: ResolverTypeWrapper<MoveLabelSuccess>;
  MoveToFolderError: ResolverTypeWrapper<MoveToFolderError>;
  MoveToFolderErrorCode: MoveToFolderErrorCode;
  MoveToFolderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MoveToFolderResult']>;
  MoveToFolderSuccess: ResolverTypeWrapper<MoveToFolderSuccess>;
  Mutation: ResolverTypeWrapper<{}>;
  NewsletterEmail: ResolverTypeWrapper<NewsletterEmail>;
  NewsletterEmailsError: ResolverTypeWrapper<NewsletterEmailsError>;
  NewsletterEmailsErrorCode: NewsletterEmailsErrorCode;
  NewsletterEmailsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NewsletterEmailsResult']>;
  NewsletterEmailsSuccess: ResolverTypeWrapper<NewsletterEmailsSuccess>;
  OptInFeatureError: ResolverTypeWrapper<OptInFeatureError>;
  OptInFeatureErrorCode: OptInFeatureErrorCode;
  OptInFeatureInput: OptInFeatureInput;
  OptInFeatureResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['OptInFeatureResult']>;
  OptInFeatureSuccess: ResolverTypeWrapper<OptInFeatureSuccess>;
  Page: ResolverTypeWrapper<Page>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageInfoInput: PageInfoInput;
  PageType: PageType;
  ParseResult: ParseResult;
  Post: ResolverTypeWrapper<Post>;
  PostEdge: ResolverTypeWrapper<PostEdge>;
  PostError: ResolverTypeWrapper<PostError>;
  PostErrorCode: PostErrorCode;
  PostResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PostResult']>;
  PostSuccess: ResolverTypeWrapper<PostSuccess>;
  PostsError: ResolverTypeWrapper<PostsError>;
  PostsErrorCode: PostsErrorCode;
  PostsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PostsResult']>;
  PostsSuccess: ResolverTypeWrapper<PostsSuccess>;
  PreparedDocumentInput: PreparedDocumentInput;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Reaction>;
  ReactionType: ReactionType;
  ReadState: ResolverTypeWrapper<ReadState>;
  RecentEmail: ResolverTypeWrapper<RecentEmail>;
  RecentEmailsError: ResolverTypeWrapper<RecentEmailsError>;
  RecentEmailsErrorCode: RecentEmailsErrorCode;
  RecentEmailsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RecentEmailsResult']>;
  RecentEmailsSuccess: ResolverTypeWrapper<RecentEmailsSuccess>;
  RecentSearch: ResolverTypeWrapper<RecentSearch>;
  RecentSearchesError: ResolverTypeWrapper<RecentSearchesError>;
  RecentSearchesErrorCode: RecentSearchesErrorCode;
  RecentSearchesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RecentSearchesResult']>;
  RecentSearchesSuccess: ResolverTypeWrapper<RecentSearchesSuccess>;
  RecommendError: ResolverTypeWrapper<RecommendError>;
  RecommendErrorCode: RecommendErrorCode;
  RecommendHighlightsError: ResolverTypeWrapper<RecommendHighlightsError>;
  RecommendHighlightsErrorCode: RecommendHighlightsErrorCode;
  RecommendHighlightsInput: RecommendHighlightsInput;
  RecommendHighlightsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RecommendHighlightsResult']>;
  RecommendHighlightsSuccess: ResolverTypeWrapper<RecommendHighlightsSuccess>;
  RecommendInput: RecommendInput;
  RecommendResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RecommendResult']>;
  RecommendSuccess: ResolverTypeWrapper<RecommendSuccess>;
  Recommendation: ResolverTypeWrapper<Recommendation>;
  RecommendationGroup: ResolverTypeWrapper<RecommendationGroup>;
  RecommendingUser: ResolverTypeWrapper<RecommendingUser>;
  RefreshHomeError: ResolverTypeWrapper<RefreshHomeError>;
  RefreshHomeErrorCode: RefreshHomeErrorCode;
  RefreshHomeResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RefreshHomeResult']>;
  RefreshHomeSuccess: ResolverTypeWrapper<RefreshHomeSuccess>;
  RegenerateAnkiCardsError: ResolverTypeWrapper<RegenerateAnkiCardsError>;
  RegenerateAnkiCardsErrorCode: RegenerateAnkiCardsErrorCode;
  RegenerateAnkiCardsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RegenerateAnkiCardsResult']>;
  RegenerateAnkiCardsSuccess: ResolverTypeWrapper<RegenerateAnkiCardsSuccess>;
  Reminder: ResolverTypeWrapper<Reminder>;
  ReminderError: ResolverTypeWrapper<ReminderError>;
  ReminderErrorCode: ReminderErrorCode;
  ReminderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ReminderResult']>;
  ReminderSuccess: ResolverTypeWrapper<ReminderSuccess>;
  ReplyToEmailError: ResolverTypeWrapper<ReplyToEmailError>;
  ReplyToEmailErrorCode: ReplyToEmailErrorCode;
  ReplyToEmailResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ReplyToEmailResult']>;
  ReplyToEmailSuccess: ResolverTypeWrapper<ReplyToEmailSuccess>;
  ReportItemInput: ReportItemInput;
  ReportItemResult: ResolverTypeWrapper<ReportItemResult>;
  ReportType: ReportType;
  RepresentationType: RepresentationType;
  RevokeApiKeyError: ResolverTypeWrapper<RevokeApiKeyError>;
  RevokeApiKeyErrorCode: RevokeApiKeyErrorCode;
  RevokeApiKeyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RevokeApiKeyResult']>;
  RevokeApiKeySuccess: ResolverTypeWrapper<RevokeApiKeySuccess>;
  Rule: ResolverTypeWrapper<Rule>;
  RuleAction: ResolverTypeWrapper<RuleAction>;
  RuleActionInput: RuleActionInput;
  RuleActionType: RuleActionType;
  RuleEventType: RuleEventType;
  RulesError: ResolverTypeWrapper<RulesError>;
  RulesErrorCode: RulesErrorCode;
  RulesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RulesResult']>;
  RulesSuccess: ResolverTypeWrapper<RulesSuccess>;
  SaveArticleReadingProgressError: ResolverTypeWrapper<SaveArticleReadingProgressError>;
  SaveArticleReadingProgressErrorCode: SaveArticleReadingProgressErrorCode;
  SaveArticleReadingProgressInput: SaveArticleReadingProgressInput;
  SaveArticleReadingProgressResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SaveArticleReadingProgressResult']>;
  SaveArticleReadingProgressSuccess: ResolverTypeWrapper<SaveArticleReadingProgressSuccess>;
  SaveDiscoverArticleError: ResolverTypeWrapper<SaveDiscoverArticleError>;
  SaveDiscoverArticleErrorCode: SaveDiscoverArticleErrorCode;
  SaveDiscoverArticleInput: SaveDiscoverArticleInput;
  SaveDiscoverArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SaveDiscoverArticleResult']>;
  SaveDiscoverArticleSuccess: ResolverTypeWrapper<SaveDiscoverArticleSuccess>;
  SaveError: ResolverTypeWrapper<SaveError>;
  SaveErrorCode: SaveErrorCode;
  SaveFileInput: SaveFileInput;
  SaveFilterError: ResolverTypeWrapper<SaveFilterError>;
  SaveFilterErrorCode: SaveFilterErrorCode;
  SaveFilterInput: SaveFilterInput;
  SaveFilterResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SaveFilterResult']>;
  SaveFilterSuccess: ResolverTypeWrapper<SaveFilterSuccess>;
  SavePageInput: SavePageInput;
  SaveResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SaveResult']>;
  SaveSuccess: ResolverTypeWrapper<SaveSuccess>;
  SaveUrlInput: SaveUrlInput;
  ScanFeedsError: ResolverTypeWrapper<ScanFeedsError>;
  ScanFeedsErrorCode: ScanFeedsErrorCode;
  ScanFeedsInput: ScanFeedsInput;
  ScanFeedsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ScanFeedsResult']>;
  ScanFeedsSuccess: ResolverTypeWrapper<ScanFeedsSuccess>;
  SearchError: ResolverTypeWrapper<SearchError>;
  SearchErrorCode: SearchErrorCode;
  SearchItem: ResolverTypeWrapper<SearchItem>;
  SearchItemEdge: ResolverTypeWrapper<SearchItemEdge>;
  SearchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SearchResult']>;
  SearchSuccess: ResolverTypeWrapper<SearchSuccess>;
  SendInstallInstructionsError: ResolverTypeWrapper<SendInstallInstructionsError>;
  SendInstallInstructionsErrorCode: SendInstallInstructionsErrorCode;
  SendInstallInstructionsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SendInstallInstructionsResult']>;
  SendInstallInstructionsSuccess: ResolverTypeWrapper<SendInstallInstructionsSuccess>;
  SetBookmarkArticleError: ResolverTypeWrapper<SetBookmarkArticleError>;
  SetBookmarkArticleErrorCode: SetBookmarkArticleErrorCode;
  SetBookmarkArticleInput: SetBookmarkArticleInput;
  SetBookmarkArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetBookmarkArticleResult']>;
  SetBookmarkArticleSuccess: ResolverTypeWrapper<SetBookmarkArticleSuccess>;
  SetDeviceTokenError: ResolverTypeWrapper<SetDeviceTokenError>;
  SetDeviceTokenErrorCode: SetDeviceTokenErrorCode;
  SetDeviceTokenInput: SetDeviceTokenInput;
  SetDeviceTokenResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetDeviceTokenResult']>;
  SetDeviceTokenSuccess: ResolverTypeWrapper<SetDeviceTokenSuccess>;
  SetFavoriteArticleError: ResolverTypeWrapper<SetFavoriteArticleError>;
  SetFavoriteArticleErrorCode: SetFavoriteArticleErrorCode;
  SetFavoriteArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetFavoriteArticleResult']>;
  SetFavoriteArticleSuccess: ResolverTypeWrapper<SetFavoriteArticleSuccess>;
  SetFollowError: ResolverTypeWrapper<SetFollowError>;
  SetFollowErrorCode: SetFollowErrorCode;
  SetFollowInput: SetFollowInput;
  SetFollowResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetFollowResult']>;
  SetFollowSuccess: ResolverTypeWrapper<SetFollowSuccess>;
  SetIntegrationError: ResolverTypeWrapper<SetIntegrationError>;
  SetIntegrationErrorCode: SetIntegrationErrorCode;
  SetIntegrationInput: SetIntegrationInput;
  SetIntegrationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetIntegrationResult']>;
  SetIntegrationSuccess: ResolverTypeWrapper<SetIntegrationSuccess>;
  SetLabelsError: ResolverTypeWrapper<SetLabelsError>;
  SetLabelsErrorCode: SetLabelsErrorCode;
  SetLabelsForHighlightInput: SetLabelsForHighlightInput;
  SetLabelsInput: SetLabelsInput;
  SetLabelsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetLabelsResult']>;
  SetLabelsSuccess: ResolverTypeWrapper<SetLabelsSuccess>;
  SetRuleError: ResolverTypeWrapper<SetRuleError>;
  SetRuleErrorCode: SetRuleErrorCode;
  SetRuleInput: SetRuleInput;
  SetRuleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetRuleResult']>;
  SetRuleSuccess: ResolverTypeWrapper<SetRuleSuccess>;
  SetShareArticleError: ResolverTypeWrapper<SetShareArticleError>;
  SetShareArticleErrorCode: SetShareArticleErrorCode;
  SetShareArticleInput: SetShareArticleInput;
  SetShareArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetShareArticleResult']>;
  SetShareArticleSuccess: ResolverTypeWrapper<SetShareArticleSuccess>;
  SetShareHighlightError: ResolverTypeWrapper<SetShareHighlightError>;
  SetShareHighlightErrorCode: SetShareHighlightErrorCode;
  SetShareHighlightInput: SetShareHighlightInput;
  SetShareHighlightResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetShareHighlightResult']>;
  SetShareHighlightSuccess: ResolverTypeWrapper<SetShareHighlightSuccess>;
  SetShowTranslatedError: ResolverTypeWrapper<SetShowTranslatedError>;
  SetShowTranslatedErrorCode: SetShowTranslatedErrorCode;
  SetShowTranslatedResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetShowTranslatedResult']>;
  SetShowTranslatedSuccess: ResolverTypeWrapper<SetShowTranslatedSuccess>;
  SetUserPersonalizationError: ResolverTypeWrapper<SetUserPersonalizationError>;
  SetUserPersonalizationErrorCode: SetUserPersonalizationErrorCode;
  SetUserPersonalizationInput: SetUserPersonalizationInput;
  SetUserPersonalizationResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetUserPersonalizationResult']>;
  SetUserPersonalizationSuccess: ResolverTypeWrapper<SetUserPersonalizationSuccess>;
  SetWebhookError: ResolverTypeWrapper<SetWebhookError>;
  SetWebhookErrorCode: SetWebhookErrorCode;
  SetWebhookInput: SetWebhookInput;
  SetWebhookResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetWebhookResult']>;
  SetWebhookSuccess: ResolverTypeWrapper<SetWebhookSuccess>;
  ShareStats: ResolverTypeWrapper<ShareStats>;
  SharedArticleError: ResolverTypeWrapper<SharedArticleError>;
  SharedArticleErrorCode: SharedArticleErrorCode;
  SharedArticleResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SharedArticleResult']>;
  SharedArticleSuccess: ResolverTypeWrapper<SharedArticleSuccess>;
  SignupErrorCode: SignupErrorCode;
  SortBy: SortBy;
  SortOrder: SortOrder;
  SortParams: SortParams;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubscribeError: ResolverTypeWrapper<SubscribeError>;
  SubscribeErrorCode: SubscribeErrorCode;
  SubscribeInput: SubscribeInput;
  SubscribeResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SubscribeResult']>;
  SubscribeSuccess: ResolverTypeWrapper<SubscribeSuccess>;
  Subscription: ResolverTypeWrapper<Subscription>;
  SubscriptionError: ResolverTypeWrapper<SubscriptionError>;
  SubscriptionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SubscriptionResult']>;
  SubscriptionRootType: ResolverTypeWrapper<{}>;
  SubscriptionStatus: SubscriptionStatus;
  SubscriptionSuccess: ResolverTypeWrapper<SubscriptionSuccess>;
  SubscriptionType: SubscriptionType;
  SubscriptionsError: ResolverTypeWrapper<SubscriptionsError>;
  SubscriptionsErrorCode: SubscriptionsErrorCode;
  SubscriptionsResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SubscriptionsResult']>;
  SubscriptionsSuccess: ResolverTypeWrapper<SubscriptionsSuccess>;
  SyncUpdatedItemEdge: ResolverTypeWrapper<SyncUpdatedItemEdge>;
  Task: ResolverTypeWrapper<Task>;
  TaskState: TaskState;
  TestAnkiConnectionError: ResolverTypeWrapper<TestAnkiConnectionError>;
  TestAnkiConnectionErrorCode: TestAnkiConnectionErrorCode;
  TestAnkiConnectionInput: TestAnkiConnectionInput;
  TestAnkiConnectionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TestAnkiConnectionResult']>;
  TestAnkiConnectionSuccess: ResolverTypeWrapper<TestAnkiConnectionSuccess>;
  TranslationStatus: TranslationStatus;
  TypeaheadSearchError: ResolverTypeWrapper<TypeaheadSearchError>;
  TypeaheadSearchErrorCode: TypeaheadSearchErrorCode;
  TypeaheadSearchItem: ResolverTypeWrapper<TypeaheadSearchItem>;
  TypeaheadSearchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TypeaheadSearchResult']>;
  TypeaheadSearchSuccess: ResolverTypeWrapper<TypeaheadSearchSuccess>;
  UnsubscribeError: ResolverTypeWrapper<UnsubscribeError>;
  UnsubscribeErrorCode: UnsubscribeErrorCode;
  UnsubscribeResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UnsubscribeResult']>;
  UnsubscribeSuccess: ResolverTypeWrapper<UnsubscribeSuccess>;
  UpdateEmailError: ResolverTypeWrapper<UpdateEmailError>;
  UpdateEmailErrorCode: UpdateEmailErrorCode;
  UpdateEmailInput: UpdateEmailInput;
  UpdateEmailResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateEmailResult']>;
  UpdateEmailSuccess: ResolverTypeWrapper<UpdateEmailSuccess>;
  UpdateFilterError: ResolverTypeWrapper<UpdateFilterError>;
  UpdateFilterErrorCode: UpdateFilterErrorCode;
  UpdateFilterInput: UpdateFilterInput;
  UpdateFilterResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateFilterResult']>;
  UpdateFilterSuccess: ResolverTypeWrapper<UpdateFilterSuccess>;
  UpdateFolderPolicyError: ResolverTypeWrapper<UpdateFolderPolicyError>;
  UpdateFolderPolicyErrorCode: UpdateFolderPolicyErrorCode;
  UpdateFolderPolicyInput: UpdateFolderPolicyInput;
  UpdateFolderPolicyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateFolderPolicyResult']>;
  UpdateFolderPolicySuccess: ResolverTypeWrapper<UpdateFolderPolicySuccess>;
  UpdateHighlightError: ResolverTypeWrapper<UpdateHighlightError>;
  UpdateHighlightErrorCode: UpdateHighlightErrorCode;
  UpdateHighlightInput: UpdateHighlightInput;
  UpdateHighlightReplyError: ResolverTypeWrapper<UpdateHighlightReplyError>;
  UpdateHighlightReplyErrorCode: UpdateHighlightReplyErrorCode;
  UpdateHighlightReplyInput: UpdateHighlightReplyInput;
  UpdateHighlightReplyResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateHighlightReplyResult']>;
  UpdateHighlightReplySuccess: ResolverTypeWrapper<UpdateHighlightReplySuccess>;
  UpdateHighlightResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateHighlightResult']>;
  UpdateHighlightSuccess: ResolverTypeWrapper<UpdateHighlightSuccess>;
  UpdateLabelError: ResolverTypeWrapper<UpdateLabelError>;
  UpdateLabelErrorCode: UpdateLabelErrorCode;
  UpdateLabelInput: UpdateLabelInput;
  UpdateLabelResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateLabelResult']>;
  UpdateLabelSuccess: ResolverTypeWrapper<UpdateLabelSuccess>;
  UpdateLinkShareInfoError: ResolverTypeWrapper<UpdateLinkShareInfoError>;
  UpdateLinkShareInfoErrorCode: UpdateLinkShareInfoErrorCode;
  UpdateLinkShareInfoInput: UpdateLinkShareInfoInput;
  UpdateLinkShareInfoResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateLinkShareInfoResult']>;
  UpdateLinkShareInfoSuccess: ResolverTypeWrapper<UpdateLinkShareInfoSuccess>;
  UpdateNewsletterEmailError: ResolverTypeWrapper<UpdateNewsletterEmailError>;
  UpdateNewsletterEmailErrorCode: UpdateNewsletterEmailErrorCode;
  UpdateNewsletterEmailInput: UpdateNewsletterEmailInput;
  UpdateNewsletterEmailResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateNewsletterEmailResult']>;
  UpdateNewsletterEmailSuccess: ResolverTypeWrapper<UpdateNewsletterEmailSuccess>;
  UpdatePageError: ResolverTypeWrapper<UpdatePageError>;
  UpdatePageErrorCode: UpdatePageErrorCode;
  UpdatePageInput: UpdatePageInput;
  UpdatePageResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdatePageResult']>;
  UpdatePageSuccess: ResolverTypeWrapper<UpdatePageSuccess>;
  UpdatePostError: ResolverTypeWrapper<UpdatePostError>;
  UpdatePostErrorCode: UpdatePostErrorCode;
  UpdatePostInput: UpdatePostInput;
  UpdatePostResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdatePostResult']>;
  UpdatePostSuccess: ResolverTypeWrapper<UpdatePostSuccess>;
  UpdateReason: UpdateReason;
  UpdateReminderError: ResolverTypeWrapper<UpdateReminderError>;
  UpdateReminderErrorCode: UpdateReminderErrorCode;
  UpdateReminderInput: UpdateReminderInput;
  UpdateReminderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateReminderResult']>;
  UpdateReminderSuccess: ResolverTypeWrapper<UpdateReminderSuccess>;
  UpdateSharedCommentError: ResolverTypeWrapper<UpdateSharedCommentError>;
  UpdateSharedCommentErrorCode: UpdateSharedCommentErrorCode;
  UpdateSharedCommentInput: UpdateSharedCommentInput;
  UpdateSharedCommentResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateSharedCommentResult']>;
  UpdateSharedCommentSuccess: ResolverTypeWrapper<UpdateSharedCommentSuccess>;
  UpdateSubscriptionError: ResolverTypeWrapper<UpdateSubscriptionError>;
  UpdateSubscriptionErrorCode: UpdateSubscriptionErrorCode;
  UpdateSubscriptionInput: UpdateSubscriptionInput;
  UpdateSubscriptionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateSubscriptionResult']>;
  UpdateSubscriptionSuccess: ResolverTypeWrapper<UpdateSubscriptionSuccess>;
  UpdateUserError: ResolverTypeWrapper<UpdateUserError>;
  UpdateUserErrorCode: UpdateUserErrorCode;
  UpdateUserInput: UpdateUserInput;
  UpdateUserProfileError: ResolverTypeWrapper<UpdateUserProfileError>;
  UpdateUserProfileErrorCode: UpdateUserProfileErrorCode;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfileResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateUserProfileResult']>;
  UpdateUserProfileSuccess: ResolverTypeWrapper<UpdateUserProfileSuccess>;
  UpdateUserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateUserResult']>;
  UpdateUserSuccess: ResolverTypeWrapper<UpdateUserSuccess>;
  UpdatesSinceError: ResolverTypeWrapper<UpdatesSinceError>;
  UpdatesSinceErrorCode: UpdatesSinceErrorCode;
  UpdatesSinceResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdatesSinceResult']>;
  UpdatesSinceSuccess: ResolverTypeWrapper<UpdatesSinceSuccess>;
  UploadFileRequestError: ResolverTypeWrapper<UploadFileRequestError>;
  UploadFileRequestErrorCode: UploadFileRequestErrorCode;
  UploadFileRequestInput: UploadFileRequestInput;
  UploadFileRequestResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UploadFileRequestResult']>;
  UploadFileRequestSuccess: ResolverTypeWrapper<UploadFileRequestSuccess>;
  UploadFileStatus: UploadFileStatus;
  UploadImportFileError: ResolverTypeWrapper<UploadImportFileError>;
  UploadImportFileErrorCode: UploadImportFileErrorCode;
  UploadImportFileResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UploadImportFileResult']>;
  UploadImportFileSuccess: ResolverTypeWrapper<UploadImportFileSuccess>;
  UploadImportFileType: UploadImportFileType;
  User: ResolverTypeWrapper<User>;
  UserError: ResolverTypeWrapper<UserError>;
  UserErrorCode: UserErrorCode;
  UserPersonalization: ResolverTypeWrapper<UserPersonalization>;
  UserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserResult']>;
  UserSuccess: ResolverTypeWrapper<UserSuccess>;
  UsersError: ResolverTypeWrapper<UsersError>;
  UsersErrorCode: UsersErrorCode;
  UsersResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UsersResult']>;
  UsersSuccess: ResolverTypeWrapper<UsersSuccess>;
  Webhook: ResolverTypeWrapper<Webhook>;
  WebhookError: ResolverTypeWrapper<WebhookError>;
  WebhookErrorCode: WebhookErrorCode;
  WebhookEvent: WebhookEvent;
  WebhookResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['WebhookResult']>;
  WebhookSuccess: ResolverTypeWrapper<WebhookSuccess>;
  WebhooksError: ResolverTypeWrapper<WebhooksError>;
  WebhooksErrorCode: WebhooksErrorCode;
  WebhooksResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['WebhooksResult']>;
  WebhooksSuccess: ResolverTypeWrapper<WebhooksSuccess>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddDiscoverFeedError: AddDiscoverFeedError;
  AddDiscoverFeedInput: AddDiscoverFeedInput;
  AddDiscoverFeedResult: ResolversUnionTypes<ResolversParentTypes>['AddDiscoverFeedResult'];
  AddDiscoverFeedSuccess: AddDiscoverFeedSuccess;
  AddPopularReadError: AddPopularReadError;
  AddPopularReadResult: ResolversUnionTypes<ResolversParentTypes>['AddPopularReadResult'];
  AddPopularReadSuccess: AddPopularReadSuccess;
  AnkiCardBatch: AnkiCardBatch;
  AnkiCardBatchesError: AnkiCardBatchesError;
  AnkiCardBatchesInput: AnkiCardBatchesInput;
  AnkiCardBatchesResult: ResolversUnionTypes<ResolversParentTypes>['AnkiCardBatchesResult'];
  AnkiCardBatchesSuccess: AnkiCardBatchesSuccess;
  AnkiCardDetail: AnkiCardDetail;
  AnkiCardsError: AnkiCardsError;
  AnkiCardsResult: ResolversUnionTypes<ResolversParentTypes>['AnkiCardsResult'];
  AnkiCardsSuccess: AnkiCardsSuccess;
  AnkiIntegrationError: AnkiIntegrationError;
  AnkiIntegrationResult: ResolversUnionTypes<ResolversParentTypes>['AnkiIntegrationResult'];
  AnkiIntegrationSuccess: AnkiIntegrationSuccess;
  ApiKey: ApiKey;
  ApiKeysError: ApiKeysError;
  ApiKeysResult: ResolversUnionTypes<ResolversParentTypes>['ApiKeysResult'];
  ApiKeysSuccess: ApiKeysSuccess;
  ArchiveLinkError: ArchiveLinkError;
  ArchiveLinkInput: ArchiveLinkInput;
  ArchiveLinkResult: ResolversUnionTypes<ResolversParentTypes>['ArchiveLinkResult'];
  ArchiveLinkSuccess: ArchiveLinkSuccess;
  Article: Article;
  ArticleEdge: ArticleEdge;
  ArticleError: ArticleError;
  ArticleHighlightsInput: ArticleHighlightsInput;
  ArticleResult: ResolversUnionTypes<ResolversParentTypes>['ArticleResult'];
  ArticleSavingRequest: ArticleSavingRequest;
  ArticleSavingRequestError: ArticleSavingRequestError;
  ArticleSavingRequestResult: ResolversUnionTypes<ResolversParentTypes>['ArticleSavingRequestResult'];
  ArticleSavingRequestSuccess: ArticleSavingRequestSuccess;
  ArticleSuccess: ArticleSuccess;
  ArticlesError: ArticlesError;
  ArticlesResult: ResolversUnionTypes<ResolversParentTypes>['ArticlesResult'];
  ArticlesSuccess: ArticlesSuccess;
  Boolean: Scalars['Boolean']['output'];
  BulkActionError: BulkActionError;
  BulkActionResult: ResolversUnionTypes<ResolversParentTypes>['BulkActionResult'];
  BulkActionSuccess: BulkActionSuccess;
  CreateArticleError: CreateArticleError;
  CreateArticleInput: CreateArticleInput;
  CreateArticleResult: ResolversUnionTypes<ResolversParentTypes>['CreateArticleResult'];
  CreateArticleSavingRequestError: CreateArticleSavingRequestError;
  CreateArticleSavingRequestInput: CreateArticleSavingRequestInput;
  CreateArticleSavingRequestResult: ResolversUnionTypes<ResolversParentTypes>['CreateArticleSavingRequestResult'];
  CreateArticleSavingRequestSuccess: CreateArticleSavingRequestSuccess;
  CreateArticleSuccess: CreateArticleSuccess;
  CreateFolderPolicyError: CreateFolderPolicyError;
  CreateFolderPolicyInput: CreateFolderPolicyInput;
  CreateFolderPolicyResult: ResolversUnionTypes<ResolversParentTypes>['CreateFolderPolicyResult'];
  CreateFolderPolicySuccess: CreateFolderPolicySuccess;
  CreateGroupError: CreateGroupError;
  CreateGroupInput: CreateGroupInput;
  CreateGroupResult: ResolversUnionTypes<ResolversParentTypes>['CreateGroupResult'];
  CreateGroupSuccess: CreateGroupSuccess;
  CreateHighlightError: CreateHighlightError;
  CreateHighlightInput: CreateHighlightInput;
  CreateHighlightReplyError: CreateHighlightReplyError;
  CreateHighlightReplyInput: CreateHighlightReplyInput;
  CreateHighlightReplyResult: ResolversUnionTypes<ResolversParentTypes>['CreateHighlightReplyResult'];
  CreateHighlightReplySuccess: CreateHighlightReplySuccess;
  CreateHighlightResult: ResolversUnionTypes<ResolversParentTypes>['CreateHighlightResult'];
  CreateHighlightSuccess: CreateHighlightSuccess;
  CreateLabelError: CreateLabelError;
  CreateLabelInput: CreateLabelInput;
  CreateLabelResult: ResolversUnionTypes<ResolversParentTypes>['CreateLabelResult'];
  CreateLabelSuccess: CreateLabelSuccess;
  CreateNewsletterEmailError: CreateNewsletterEmailError;
  CreateNewsletterEmailInput: CreateNewsletterEmailInput;
  CreateNewsletterEmailResult: ResolversUnionTypes<ResolversParentTypes>['CreateNewsletterEmailResult'];
  CreateNewsletterEmailSuccess: CreateNewsletterEmailSuccess;
  CreatePostError: CreatePostError;
  CreatePostInput: CreatePostInput;
  CreatePostResult: ResolversUnionTypes<ResolversParentTypes>['CreatePostResult'];
  CreatePostSuccess: CreatePostSuccess;
  CreateReactionError: CreateReactionError;
  CreateReactionInput: CreateReactionInput;
  CreateReactionResult: ResolversUnionTypes<ResolversParentTypes>['CreateReactionResult'];
  CreateReactionSuccess: CreateReactionSuccess;
  CreateReminderError: CreateReminderError;
  CreateReminderInput: CreateReminderInput;
  CreateReminderResult: ResolversUnionTypes<ResolversParentTypes>['CreateReminderResult'];
  CreateReminderSuccess: CreateReminderSuccess;
  Date: Scalars['Date']['output'];
  DeleteAccountError: DeleteAccountError;
  DeleteAccountResult: ResolversUnionTypes<ResolversParentTypes>['DeleteAccountResult'];
  DeleteAccountSuccess: DeleteAccountSuccess;
  DeleteDiscoverArticleError: DeleteDiscoverArticleError;
  DeleteDiscoverArticleInput: DeleteDiscoverArticleInput;
  DeleteDiscoverArticleResult: ResolversUnionTypes<ResolversParentTypes>['DeleteDiscoverArticleResult'];
  DeleteDiscoverArticleSuccess: DeleteDiscoverArticleSuccess;
  DeleteDiscoverFeedError: DeleteDiscoverFeedError;
  DeleteDiscoverFeedInput: DeleteDiscoverFeedInput;
  DeleteDiscoverFeedResult: ResolversUnionTypes<ResolversParentTypes>['DeleteDiscoverFeedResult'];
  DeleteDiscoverFeedSuccess: DeleteDiscoverFeedSuccess;
  DeleteFilterError: DeleteFilterError;
  DeleteFilterResult: ResolversUnionTypes<ResolversParentTypes>['DeleteFilterResult'];
  DeleteFilterSuccess: DeleteFilterSuccess;
  DeleteFolderPolicyError: DeleteFolderPolicyError;
  DeleteFolderPolicyResult: ResolversUnionTypes<ResolversParentTypes>['DeleteFolderPolicyResult'];
  DeleteFolderPolicySuccess: DeleteFolderPolicySuccess;
  DeleteHighlightError: DeleteHighlightError;
  DeleteHighlightReplyError: DeleteHighlightReplyError;
  DeleteHighlightReplyResult: ResolversUnionTypes<ResolversParentTypes>['DeleteHighlightReplyResult'];
  DeleteHighlightReplySuccess: DeleteHighlightReplySuccess;
  DeleteHighlightResult: ResolversUnionTypes<ResolversParentTypes>['DeleteHighlightResult'];
  DeleteHighlightSuccess: DeleteHighlightSuccess;
  DeleteIntegrationError: DeleteIntegrationError;
  DeleteIntegrationResult: ResolversUnionTypes<ResolversParentTypes>['DeleteIntegrationResult'];
  DeleteIntegrationSuccess: DeleteIntegrationSuccess;
  DeleteLabelError: DeleteLabelError;
  DeleteLabelResult: ResolversUnionTypes<ResolversParentTypes>['DeleteLabelResult'];
  DeleteLabelSuccess: DeleteLabelSuccess;
  DeleteNewsletterEmailError: DeleteNewsletterEmailError;
  DeleteNewsletterEmailResult: ResolversUnionTypes<ResolversParentTypes>['DeleteNewsletterEmailResult'];
  DeleteNewsletterEmailSuccess: DeleteNewsletterEmailSuccess;
  DeletePostError: DeletePostError;
  DeletePostResult: ResolversUnionTypes<ResolversParentTypes>['DeletePostResult'];
  DeletePostSuccess: DeletePostSuccess;
  DeleteReactionError: DeleteReactionError;
  DeleteReactionResult: ResolversUnionTypes<ResolversParentTypes>['DeleteReactionResult'];
  DeleteReactionSuccess: DeleteReactionSuccess;
  DeleteReminderError: DeleteReminderError;
  DeleteReminderResult: ResolversUnionTypes<ResolversParentTypes>['DeleteReminderResult'];
  DeleteReminderSuccess: DeleteReminderSuccess;
  DeleteRuleError: DeleteRuleError;
  DeleteRuleResult: ResolversUnionTypes<ResolversParentTypes>['DeleteRuleResult'];
  DeleteRuleSuccess: DeleteRuleSuccess;
  DeleteWebhookError: DeleteWebhookError;
  DeleteWebhookResult: ResolversUnionTypes<ResolversParentTypes>['DeleteWebhookResult'];
  DeleteWebhookSuccess: DeleteWebhookSuccess;
  DeviceToken: DeviceToken;
  DeviceTokensError: DeviceTokensError;
  DeviceTokensResult: ResolversUnionTypes<ResolversParentTypes>['DeviceTokensResult'];
  DeviceTokensSuccess: DeviceTokensSuccess;
  DigestConfig: DigestConfig;
  DigestConfigInput: DigestConfigInput;
  DiscoverFeed: DiscoverFeed;
  DiscoverFeedArticle: DiscoverFeedArticle;
  DiscoverFeedError: DiscoverFeedError;
  DiscoverFeedResult: ResolversUnionTypes<ResolversParentTypes>['DiscoverFeedResult'];
  DiscoverFeedSuccess: DiscoverFeedSuccess;
  DiscoverTopic: DiscoverTopic;
  EditDiscoverFeedError: EditDiscoverFeedError;
  EditDiscoverFeedInput: EditDiscoverFeedInput;
  EditDiscoverFeedResult: ResolversUnionTypes<ResolversParentTypes>['EditDiscoverFeedResult'];
  EditDiscoverFeedSuccess: EditDiscoverFeedSuccess;
  EmptyTrashError: EmptyTrashError;
  EmptyTrashResult: ResolversUnionTypes<ResolversParentTypes>['EmptyTrashResult'];
  EmptyTrashSuccess: EmptyTrashSuccess;
  ExportToIntegrationError: ExportToIntegrationError;
  ExportToIntegrationResult: ResolversUnionTypes<ResolversParentTypes>['ExportToIntegrationResult'];
  ExportToIntegrationSuccess: ExportToIntegrationSuccess;
  Feature: Feature;
  Feed: Feed;
  FeedArticle: FeedArticle;
  FeedArticleEdge: FeedArticleEdge;
  FeedArticlesError: FeedArticlesError;
  FeedArticlesResult: ResolversUnionTypes<ResolversParentTypes>['FeedArticlesResult'];
  FeedArticlesSuccess: FeedArticlesSuccess;
  FeedEdge: FeedEdge;
  FeedsError: FeedsError;
  FeedsInput: FeedsInput;
  FeedsResult: ResolversUnionTypes<ResolversParentTypes>['FeedsResult'];
  FeedsSuccess: FeedsSuccess;
  FetchContentError: FetchContentError;
  FetchContentResult: ResolversUnionTypes<ResolversParentTypes>['FetchContentResult'];
  FetchContentSuccess: FetchContentSuccess;
  Filter: Filter;
  FiltersError: FiltersError;
  FiltersResult: ResolversUnionTypes<ResolversParentTypes>['FiltersResult'];
  FiltersSuccess: FiltersSuccess;
  Float: Scalars['Float']['output'];
  FolderPoliciesError: FolderPoliciesError;
  FolderPoliciesResult: ResolversUnionTypes<ResolversParentTypes>['FolderPoliciesResult'];
  FolderPoliciesSuccess: FolderPoliciesSuccess;
  FolderPolicy: FolderPolicy;
  GenerateAnkiCardsBatchError: GenerateAnkiCardsBatchError;
  GenerateAnkiCardsBatchInput: GenerateAnkiCardsBatchInput;
  GenerateAnkiCardsBatchResult: ResolversUnionTypes<ResolversParentTypes>['GenerateAnkiCardsBatchResult'];
  GenerateAnkiCardsBatchSuccess: GenerateAnkiCardsBatchSuccess;
  GenerateAnkiCardsError: GenerateAnkiCardsError;
  GenerateAnkiCardsResult: ResolversUnionTypes<ResolversParentTypes>['GenerateAnkiCardsResult'];
  GenerateAnkiCardsSuccess: GenerateAnkiCardsSuccess;
  GenerateApiKeyError: GenerateApiKeyError;
  GenerateApiKeyInput: GenerateApiKeyInput;
  GenerateApiKeyResult: ResolversUnionTypes<ResolversParentTypes>['GenerateApiKeyResult'];
  GenerateApiKeySuccess: GenerateApiKeySuccess;
  GetDiscoverFeedArticleError: GetDiscoverFeedArticleError;
  GetDiscoverFeedArticleResults: ResolversUnionTypes<ResolversParentTypes>['GetDiscoverFeedArticleResults'];
  GetDiscoverFeedArticleSuccess: GetDiscoverFeedArticleSuccess;
  GetDiscoverTopicError: GetDiscoverTopicError;
  GetDiscoverTopicResults: ResolversUnionTypes<ResolversParentTypes>['GetDiscoverTopicResults'];
  GetDiscoverTopicSuccess: GetDiscoverTopicSuccess;
  GetFollowersError: GetFollowersError;
  GetFollowersResult: ResolversUnionTypes<ResolversParentTypes>['GetFollowersResult'];
  GetFollowersSuccess: GetFollowersSuccess;
  GetFollowingError: GetFollowingError;
  GetFollowingResult: ResolversUnionTypes<ResolversParentTypes>['GetFollowingResult'];
  GetFollowingSuccess: GetFollowingSuccess;
  GetUserPersonalizationError: GetUserPersonalizationError;
  GetUserPersonalizationResult: ResolversUnionTypes<ResolversParentTypes>['GetUserPersonalizationResult'];
  GetUserPersonalizationSuccess: GetUserPersonalizationSuccess;
  GoogleLoginInput: GoogleLoginInput;
  GoogleSignupError: GoogleSignupError;
  GoogleSignupInput: GoogleSignupInput;
  GoogleSignupResult: ResolversUnionTypes<ResolversParentTypes>['GoogleSignupResult'];
  GoogleSignupSuccess: GoogleSignupSuccess;
  GroupsError: GroupsError;
  GroupsResult: ResolversUnionTypes<ResolversParentTypes>['GroupsResult'];
  GroupsSuccess: GroupsSuccess;
  HiddenHomeSectionError: HiddenHomeSectionError;
  HiddenHomeSectionResult: ResolversUnionTypes<ResolversParentTypes>['HiddenHomeSectionResult'];
  HiddenHomeSectionSuccess: HiddenHomeSectionSuccess;
  Highlight: Highlight;
  HighlightEdge: HighlightEdge;
  HighlightReply: HighlightReply;
  HighlightStats: HighlightStats;
  HighlightsError: HighlightsError;
  HighlightsResult: ResolversUnionTypes<ResolversParentTypes>['HighlightsResult'];
  HighlightsSuccess: HighlightsSuccess;
  HomeEdge: HomeEdge;
  HomeError: HomeError;
  HomeItem: HomeItem;
  HomeItemSource: HomeItemSource;
  HomeResult: ResolversUnionTypes<ResolversParentTypes>['HomeResult'];
  HomeSection: HomeSection;
  HomeSuccess: HomeSuccess;
  ID: Scalars['ID']['output'];
  ImportFromIntegrationError: ImportFromIntegrationError;
  ImportFromIntegrationResult: ResolversUnionTypes<ResolversParentTypes>['ImportFromIntegrationResult'];
  ImportFromIntegrationSuccess: ImportFromIntegrationSuccess;
  Int: Scalars['Int']['output'];
  Integration: Integration;
  IntegrationError: IntegrationError;
  IntegrationResult: ResolversUnionTypes<ResolversParentTypes>['IntegrationResult'];
  IntegrationSuccess: IntegrationSuccess;
  IntegrationsError: IntegrationsError;
  IntegrationsResult: ResolversUnionTypes<ResolversParentTypes>['IntegrationsResult'];
  IntegrationsSuccess: IntegrationsSuccess;
  JSON: Scalars['JSON']['output'];
  JoinGroupError: JoinGroupError;
  JoinGroupResult: ResolversUnionTypes<ResolversParentTypes>['JoinGroupResult'];
  JoinGroupSuccess: JoinGroupSuccess;
  Label: Label;
  LabelsError: LabelsError;
  LabelsResult: ResolversUnionTypes<ResolversParentTypes>['LabelsResult'];
  LabelsSuccess: LabelsSuccess;
  LeaveGroupError: LeaveGroupError;
  LeaveGroupResult: ResolversUnionTypes<ResolversParentTypes>['LeaveGroupResult'];
  LeaveGroupSuccess: LeaveGroupSuccess;
  Link: Link;
  LinkShareInfo: LinkShareInfo;
  LogOutError: LogOutError;
  LogOutResult: ResolversUnionTypes<ResolversParentTypes>['LogOutResult'];
  LogOutSuccess: LogOutSuccess;
  LoginError: LoginError;
  LoginResult: ResolversUnionTypes<ResolversParentTypes>['LoginResult'];
  LoginSuccess: LoginSuccess;
  MarkEmailAsItemError: MarkEmailAsItemError;
  MarkEmailAsItemResult: ResolversUnionTypes<ResolversParentTypes>['MarkEmailAsItemResult'];
  MarkEmailAsItemSuccess: MarkEmailAsItemSuccess;
  MergeHighlightError: MergeHighlightError;
  MergeHighlightInput: MergeHighlightInput;
  MergeHighlightResult: ResolversUnionTypes<ResolversParentTypes>['MergeHighlightResult'];
  MergeHighlightSuccess: MergeHighlightSuccess;
  MoveFilterError: MoveFilterError;
  MoveFilterInput: MoveFilterInput;
  MoveFilterResult: ResolversUnionTypes<ResolversParentTypes>['MoveFilterResult'];
  MoveFilterSuccess: MoveFilterSuccess;
  MoveLabelError: MoveLabelError;
  MoveLabelInput: MoveLabelInput;
  MoveLabelResult: ResolversUnionTypes<ResolversParentTypes>['MoveLabelResult'];
  MoveLabelSuccess: MoveLabelSuccess;
  MoveToFolderError: MoveToFolderError;
  MoveToFolderResult: ResolversUnionTypes<ResolversParentTypes>['MoveToFolderResult'];
  MoveToFolderSuccess: MoveToFolderSuccess;
  Mutation: {};
  NewsletterEmail: NewsletterEmail;
  NewsletterEmailsError: NewsletterEmailsError;
  NewsletterEmailsResult: ResolversUnionTypes<ResolversParentTypes>['NewsletterEmailsResult'];
  NewsletterEmailsSuccess: NewsletterEmailsSuccess;
  OptInFeatureError: OptInFeatureError;
  OptInFeatureInput: OptInFeatureInput;
  OptInFeatureResult: ResolversUnionTypes<ResolversParentTypes>['OptInFeatureResult'];
  OptInFeatureSuccess: OptInFeatureSuccess;
  Page: Page;
  PageInfo: PageInfo;
  PageInfoInput: PageInfoInput;
  ParseResult: ParseResult;
  Post: Post;
  PostEdge: PostEdge;
  PostError: PostError;
  PostResult: ResolversUnionTypes<ResolversParentTypes>['PostResult'];
  PostSuccess: PostSuccess;
  PostsError: PostsError;
  PostsResult: ResolversUnionTypes<ResolversParentTypes>['PostsResult'];
  PostsSuccess: PostsSuccess;
  PreparedDocumentInput: PreparedDocumentInput;
  Profile: Profile;
  Query: {};
  Reaction: Reaction;
  ReadState: ReadState;
  RecentEmail: RecentEmail;
  RecentEmailsError: RecentEmailsError;
  RecentEmailsResult: ResolversUnionTypes<ResolversParentTypes>['RecentEmailsResult'];
  RecentEmailsSuccess: RecentEmailsSuccess;
  RecentSearch: RecentSearch;
  RecentSearchesError: RecentSearchesError;
  RecentSearchesResult: ResolversUnionTypes<ResolversParentTypes>['RecentSearchesResult'];
  RecentSearchesSuccess: RecentSearchesSuccess;
  RecommendError: RecommendError;
  RecommendHighlightsError: RecommendHighlightsError;
  RecommendHighlightsInput: RecommendHighlightsInput;
  RecommendHighlightsResult: ResolversUnionTypes<ResolversParentTypes>['RecommendHighlightsResult'];
  RecommendHighlightsSuccess: RecommendHighlightsSuccess;
  RecommendInput: RecommendInput;
  RecommendResult: ResolversUnionTypes<ResolversParentTypes>['RecommendResult'];
  RecommendSuccess: RecommendSuccess;
  Recommendation: Recommendation;
  RecommendationGroup: RecommendationGroup;
  RecommendingUser: RecommendingUser;
  RefreshHomeError: RefreshHomeError;
  RefreshHomeResult: ResolversUnionTypes<ResolversParentTypes>['RefreshHomeResult'];
  RefreshHomeSuccess: RefreshHomeSuccess;
  RegenerateAnkiCardsError: RegenerateAnkiCardsError;
  RegenerateAnkiCardsResult: ResolversUnionTypes<ResolversParentTypes>['RegenerateAnkiCardsResult'];
  RegenerateAnkiCardsSuccess: RegenerateAnkiCardsSuccess;
  Reminder: Reminder;
  ReminderError: ReminderError;
  ReminderResult: ResolversUnionTypes<ResolversParentTypes>['ReminderResult'];
  ReminderSuccess: ReminderSuccess;
  ReplyToEmailError: ReplyToEmailError;
  ReplyToEmailResult: ResolversUnionTypes<ResolversParentTypes>['ReplyToEmailResult'];
  ReplyToEmailSuccess: ReplyToEmailSuccess;
  ReportItemInput: ReportItemInput;
  ReportItemResult: ReportItemResult;
  RevokeApiKeyError: RevokeApiKeyError;
  RevokeApiKeyResult: ResolversUnionTypes<ResolversParentTypes>['RevokeApiKeyResult'];
  RevokeApiKeySuccess: RevokeApiKeySuccess;
  Rule: Rule;
  RuleAction: RuleAction;
  RuleActionInput: RuleActionInput;
  RulesError: RulesError;
  RulesResult: ResolversUnionTypes<ResolversParentTypes>['RulesResult'];
  RulesSuccess: RulesSuccess;
  SaveArticleReadingProgressError: SaveArticleReadingProgressError;
  SaveArticleReadingProgressInput: SaveArticleReadingProgressInput;
  SaveArticleReadingProgressResult: ResolversUnionTypes<ResolversParentTypes>['SaveArticleReadingProgressResult'];
  SaveArticleReadingProgressSuccess: SaveArticleReadingProgressSuccess;
  SaveDiscoverArticleError: SaveDiscoverArticleError;
  SaveDiscoverArticleInput: SaveDiscoverArticleInput;
  SaveDiscoverArticleResult: ResolversUnionTypes<ResolversParentTypes>['SaveDiscoverArticleResult'];
  SaveDiscoverArticleSuccess: SaveDiscoverArticleSuccess;
  SaveError: SaveError;
  SaveFileInput: SaveFileInput;
  SaveFilterError: SaveFilterError;
  SaveFilterInput: SaveFilterInput;
  SaveFilterResult: ResolversUnionTypes<ResolversParentTypes>['SaveFilterResult'];
  SaveFilterSuccess: SaveFilterSuccess;
  SavePageInput: SavePageInput;
  SaveResult: ResolversUnionTypes<ResolversParentTypes>['SaveResult'];
  SaveSuccess: SaveSuccess;
  SaveUrlInput: SaveUrlInput;
  ScanFeedsError: ScanFeedsError;
  ScanFeedsInput: ScanFeedsInput;
  ScanFeedsResult: ResolversUnionTypes<ResolversParentTypes>['ScanFeedsResult'];
  ScanFeedsSuccess: ScanFeedsSuccess;
  SearchError: SearchError;
  SearchItem: SearchItem;
  SearchItemEdge: SearchItemEdge;
  SearchResult: ResolversUnionTypes<ResolversParentTypes>['SearchResult'];
  SearchSuccess: SearchSuccess;
  SendInstallInstructionsError: SendInstallInstructionsError;
  SendInstallInstructionsResult: ResolversUnionTypes<ResolversParentTypes>['SendInstallInstructionsResult'];
  SendInstallInstructionsSuccess: SendInstallInstructionsSuccess;
  SetBookmarkArticleError: SetBookmarkArticleError;
  SetBookmarkArticleInput: SetBookmarkArticleInput;
  SetBookmarkArticleResult: ResolversUnionTypes<ResolversParentTypes>['SetBookmarkArticleResult'];
  SetBookmarkArticleSuccess: SetBookmarkArticleSuccess;
  SetDeviceTokenError: SetDeviceTokenError;
  SetDeviceTokenInput: SetDeviceTokenInput;
  SetDeviceTokenResult: ResolversUnionTypes<ResolversParentTypes>['SetDeviceTokenResult'];
  SetDeviceTokenSuccess: SetDeviceTokenSuccess;
  SetFavoriteArticleError: SetFavoriteArticleError;
  SetFavoriteArticleResult: ResolversUnionTypes<ResolversParentTypes>['SetFavoriteArticleResult'];
  SetFavoriteArticleSuccess: SetFavoriteArticleSuccess;
  SetFollowError: SetFollowError;
  SetFollowInput: SetFollowInput;
  SetFollowResult: ResolversUnionTypes<ResolversParentTypes>['SetFollowResult'];
  SetFollowSuccess: SetFollowSuccess;
  SetIntegrationError: SetIntegrationError;
  SetIntegrationInput: SetIntegrationInput;
  SetIntegrationResult: ResolversUnionTypes<ResolversParentTypes>['SetIntegrationResult'];
  SetIntegrationSuccess: SetIntegrationSuccess;
  SetLabelsError: SetLabelsError;
  SetLabelsForHighlightInput: SetLabelsForHighlightInput;
  SetLabelsInput: SetLabelsInput;
  SetLabelsResult: ResolversUnionTypes<ResolversParentTypes>['SetLabelsResult'];
  SetLabelsSuccess: SetLabelsSuccess;
  SetRuleError: SetRuleError;
  SetRuleInput: SetRuleInput;
  SetRuleResult: ResolversUnionTypes<ResolversParentTypes>['SetRuleResult'];
  SetRuleSuccess: SetRuleSuccess;
  SetShareArticleError: SetShareArticleError;
  SetShareArticleInput: SetShareArticleInput;
  SetShareArticleResult: ResolversUnionTypes<ResolversParentTypes>['SetShareArticleResult'];
  SetShareArticleSuccess: SetShareArticleSuccess;
  SetShareHighlightError: SetShareHighlightError;
  SetShareHighlightInput: SetShareHighlightInput;
  SetShareHighlightResult: ResolversUnionTypes<ResolversParentTypes>['SetShareHighlightResult'];
  SetShareHighlightSuccess: SetShareHighlightSuccess;
  SetShowTranslatedError: SetShowTranslatedError;
  SetShowTranslatedResult: ResolversUnionTypes<ResolversParentTypes>['SetShowTranslatedResult'];
  SetShowTranslatedSuccess: SetShowTranslatedSuccess;
  SetUserPersonalizationError: SetUserPersonalizationError;
  SetUserPersonalizationInput: SetUserPersonalizationInput;
  SetUserPersonalizationResult: ResolversUnionTypes<ResolversParentTypes>['SetUserPersonalizationResult'];
  SetUserPersonalizationSuccess: SetUserPersonalizationSuccess;
  SetWebhookError: SetWebhookError;
  SetWebhookInput: SetWebhookInput;
  SetWebhookResult: ResolversUnionTypes<ResolversParentTypes>['SetWebhookResult'];
  SetWebhookSuccess: SetWebhookSuccess;
  ShareStats: ShareStats;
  SharedArticleError: SharedArticleError;
  SharedArticleResult: ResolversUnionTypes<ResolversParentTypes>['SharedArticleResult'];
  SharedArticleSuccess: SharedArticleSuccess;
  SortParams: SortParams;
  String: Scalars['String']['output'];
  SubscribeError: SubscribeError;
  SubscribeInput: SubscribeInput;
  SubscribeResult: ResolversUnionTypes<ResolversParentTypes>['SubscribeResult'];
  SubscribeSuccess: SubscribeSuccess;
  Subscription: Subscription;
  SubscriptionError: SubscriptionError;
  SubscriptionResult: ResolversUnionTypes<ResolversParentTypes>['SubscriptionResult'];
  SubscriptionRootType: {};
  SubscriptionSuccess: SubscriptionSuccess;
  SubscriptionsError: SubscriptionsError;
  SubscriptionsResult: ResolversUnionTypes<ResolversParentTypes>['SubscriptionsResult'];
  SubscriptionsSuccess: SubscriptionsSuccess;
  SyncUpdatedItemEdge: SyncUpdatedItemEdge;
  Task: Task;
  TestAnkiConnectionError: TestAnkiConnectionError;
  TestAnkiConnectionInput: TestAnkiConnectionInput;
  TestAnkiConnectionResult: ResolversUnionTypes<ResolversParentTypes>['TestAnkiConnectionResult'];
  TestAnkiConnectionSuccess: TestAnkiConnectionSuccess;
  TypeaheadSearchError: TypeaheadSearchError;
  TypeaheadSearchItem: TypeaheadSearchItem;
  TypeaheadSearchResult: ResolversUnionTypes<ResolversParentTypes>['TypeaheadSearchResult'];
  TypeaheadSearchSuccess: TypeaheadSearchSuccess;
  UnsubscribeError: UnsubscribeError;
  UnsubscribeResult: ResolversUnionTypes<ResolversParentTypes>['UnsubscribeResult'];
  UnsubscribeSuccess: UnsubscribeSuccess;
  UpdateEmailError: UpdateEmailError;
  UpdateEmailInput: UpdateEmailInput;
  UpdateEmailResult: ResolversUnionTypes<ResolversParentTypes>['UpdateEmailResult'];
  UpdateEmailSuccess: UpdateEmailSuccess;
  UpdateFilterError: UpdateFilterError;
  UpdateFilterInput: UpdateFilterInput;
  UpdateFilterResult: ResolversUnionTypes<ResolversParentTypes>['UpdateFilterResult'];
  UpdateFilterSuccess: UpdateFilterSuccess;
  UpdateFolderPolicyError: UpdateFolderPolicyError;
  UpdateFolderPolicyInput: UpdateFolderPolicyInput;
  UpdateFolderPolicyResult: ResolversUnionTypes<ResolversParentTypes>['UpdateFolderPolicyResult'];
  UpdateFolderPolicySuccess: UpdateFolderPolicySuccess;
  UpdateHighlightError: UpdateHighlightError;
  UpdateHighlightInput: UpdateHighlightInput;
  UpdateHighlightReplyError: UpdateHighlightReplyError;
  UpdateHighlightReplyInput: UpdateHighlightReplyInput;
  UpdateHighlightReplyResult: ResolversUnionTypes<ResolversParentTypes>['UpdateHighlightReplyResult'];
  UpdateHighlightReplySuccess: UpdateHighlightReplySuccess;
  UpdateHighlightResult: ResolversUnionTypes<ResolversParentTypes>['UpdateHighlightResult'];
  UpdateHighlightSuccess: UpdateHighlightSuccess;
  UpdateLabelError: UpdateLabelError;
  UpdateLabelInput: UpdateLabelInput;
  UpdateLabelResult: ResolversUnionTypes<ResolversParentTypes>['UpdateLabelResult'];
  UpdateLabelSuccess: UpdateLabelSuccess;
  UpdateLinkShareInfoError: UpdateLinkShareInfoError;
  UpdateLinkShareInfoInput: UpdateLinkShareInfoInput;
  UpdateLinkShareInfoResult: ResolversUnionTypes<ResolversParentTypes>['UpdateLinkShareInfoResult'];
  UpdateLinkShareInfoSuccess: UpdateLinkShareInfoSuccess;
  UpdateNewsletterEmailError: UpdateNewsletterEmailError;
  UpdateNewsletterEmailInput: UpdateNewsletterEmailInput;
  UpdateNewsletterEmailResult: ResolversUnionTypes<ResolversParentTypes>['UpdateNewsletterEmailResult'];
  UpdateNewsletterEmailSuccess: UpdateNewsletterEmailSuccess;
  UpdatePageError: UpdatePageError;
  UpdatePageInput: UpdatePageInput;
  UpdatePageResult: ResolversUnionTypes<ResolversParentTypes>['UpdatePageResult'];
  UpdatePageSuccess: UpdatePageSuccess;
  UpdatePostError: UpdatePostError;
  UpdatePostInput: UpdatePostInput;
  UpdatePostResult: ResolversUnionTypes<ResolversParentTypes>['UpdatePostResult'];
  UpdatePostSuccess: UpdatePostSuccess;
  UpdateReminderError: UpdateReminderError;
  UpdateReminderInput: UpdateReminderInput;
  UpdateReminderResult: ResolversUnionTypes<ResolversParentTypes>['UpdateReminderResult'];
  UpdateReminderSuccess: UpdateReminderSuccess;
  UpdateSharedCommentError: UpdateSharedCommentError;
  UpdateSharedCommentInput: UpdateSharedCommentInput;
  UpdateSharedCommentResult: ResolversUnionTypes<ResolversParentTypes>['UpdateSharedCommentResult'];
  UpdateSharedCommentSuccess: UpdateSharedCommentSuccess;
  UpdateSubscriptionError: UpdateSubscriptionError;
  UpdateSubscriptionInput: UpdateSubscriptionInput;
  UpdateSubscriptionResult: ResolversUnionTypes<ResolversParentTypes>['UpdateSubscriptionResult'];
  UpdateSubscriptionSuccess: UpdateSubscriptionSuccess;
  UpdateUserError: UpdateUserError;
  UpdateUserInput: UpdateUserInput;
  UpdateUserProfileError: UpdateUserProfileError;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfileResult: ResolversUnionTypes<ResolversParentTypes>['UpdateUserProfileResult'];
  UpdateUserProfileSuccess: UpdateUserProfileSuccess;
  UpdateUserResult: ResolversUnionTypes<ResolversParentTypes>['UpdateUserResult'];
  UpdateUserSuccess: UpdateUserSuccess;
  UpdatesSinceError: UpdatesSinceError;
  UpdatesSinceResult: ResolversUnionTypes<ResolversParentTypes>['UpdatesSinceResult'];
  UpdatesSinceSuccess: UpdatesSinceSuccess;
  UploadFileRequestError: UploadFileRequestError;
  UploadFileRequestInput: UploadFileRequestInput;
  UploadFileRequestResult: ResolversUnionTypes<ResolversParentTypes>['UploadFileRequestResult'];
  UploadFileRequestSuccess: UploadFileRequestSuccess;
  UploadImportFileError: UploadImportFileError;
  UploadImportFileResult: ResolversUnionTypes<ResolversParentTypes>['UploadImportFileResult'];
  UploadImportFileSuccess: UploadImportFileSuccess;
  User: User;
  UserError: UserError;
  UserPersonalization: UserPersonalization;
  UserResult: ResolversUnionTypes<ResolversParentTypes>['UserResult'];
  UserSuccess: UserSuccess;
  UsersError: UsersError;
  UsersResult: ResolversUnionTypes<ResolversParentTypes>['UsersResult'];
  UsersSuccess: UsersSuccess;
  Webhook: Webhook;
  WebhookError: WebhookError;
  WebhookResult: ResolversUnionTypes<ResolversParentTypes>['WebhookResult'];
  WebhookSuccess: WebhookSuccess;
  WebhooksError: WebhooksError;
  WebhooksResult: ResolversUnionTypes<ResolversParentTypes>['WebhooksResult'];
  WebhooksSuccess: WebhooksSuccess;
};

export type SanitizeDirectiveArgs = {
  allowedTags?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
};

export type SanitizeDirectiveResolver<Result, Parent, ContextType = ResolverContext, Args = SanitizeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddDiscoverFeedErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddDiscoverFeedError'] = ResolversParentTypes['AddDiscoverFeedError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['AddDiscoverFeedErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddDiscoverFeedResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddDiscoverFeedResult'] = ResolversParentTypes['AddDiscoverFeedResult']> = {
  __resolveType: TypeResolveFn<'AddDiscoverFeedError' | 'AddDiscoverFeedSuccess', ParentType, ContextType>;
};

export type AddDiscoverFeedSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddDiscoverFeedSuccess'] = ResolversParentTypes['AddDiscoverFeedSuccess']> = {
  feed?: Resolver<ResolversTypes['DiscoverFeed'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddPopularReadErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddPopularReadError'] = ResolversParentTypes['AddPopularReadError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['AddPopularReadErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddPopularReadResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddPopularReadResult'] = ResolversParentTypes['AddPopularReadResult']> = {
  __resolveType: TypeResolveFn<'AddPopularReadError' | 'AddPopularReadSuccess', ParentType, ContextType>;
};

export type AddPopularReadSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddPopularReadSuccess'] = ResolversParentTypes['AddPopularReadSuccess']> = {
  pageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardBatchResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardBatch'] = ResolversParentTypes['AnkiCardBatch']> = {
  ankiNoteIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  cardCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cardDetails?: Resolver<Maybe<Array<ResolversTypes['AnkiCardDetail']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libraryItemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AnkiCardStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardBatchesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardBatchesError'] = ResolversParentTypes['AnkiCardBatchesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['AnkiCardBatchesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardBatchesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardBatchesResult'] = ResolversParentTypes['AnkiCardBatchesResult']> = {
  __resolveType: TypeResolveFn<'AnkiCardBatchesError' | 'AnkiCardBatchesSuccess', ParentType, ContextType>;
};

export type AnkiCardBatchesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardBatchesSuccess'] = ResolversParentTypes['AnkiCardBatchesSuccess']> = {
  batches?: Resolver<Array<ResolversTypes['AnkiCardBatch']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardDetailResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardDetail'] = ResolversParentTypes['AnkiCardDetail']> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  context?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardsError'] = ResolversParentTypes['AnkiCardsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['AnkiCardsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiCardsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardsResult'] = ResolversParentTypes['AnkiCardsResult']> = {
  __resolveType: TypeResolveFn<'AnkiCardsError' | 'AnkiCardsSuccess', ParentType, ContextType>;
};

export type AnkiCardsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiCardsSuccess'] = ResolversParentTypes['AnkiCardsSuccess']> = {
  batch?: Resolver<Maybe<ResolversTypes['AnkiCardBatch']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiIntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiIntegrationError'] = ResolversParentTypes['AnkiIntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['AnkiIntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnkiIntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiIntegrationResult'] = ResolversParentTypes['AnkiIntegrationResult']> = {
  __resolveType: TypeResolveFn<'AnkiIntegrationError' | 'AnkiIntegrationSuccess', ParentType, ContextType>;
};

export type AnkiIntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AnkiIntegrationSuccess'] = ResolversParentTypes['AnkiIntegrationSuccess']> = {
  integration?: Resolver<Maybe<ResolversTypes['Integration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApiKeyResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ApiKey'] = ResolversParentTypes['ApiKey']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scopes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  usedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApiKeysErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ApiKeysError'] = ResolversParentTypes['ApiKeysError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ApiKeysErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApiKeysResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ApiKeysResult'] = ResolversParentTypes['ApiKeysResult']> = {
  __resolveType: TypeResolveFn<'ApiKeysError' | 'ApiKeysSuccess', ParentType, ContextType>;
};

export type ApiKeysSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ApiKeysSuccess'] = ResolversParentTypes['ApiKeysSuccess']> = {
  apiKeys?: Resolver<Array<ResolversTypes['ApiKey']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveLinkErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArchiveLinkError'] = ResolversParentTypes['ArchiveLinkError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ArchiveLinkErrorCode']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveLinkResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArchiveLinkResult'] = ResolversParentTypes['ArchiveLinkResult']> = {
  __resolveType: TypeResolveFn<'ArchiveLinkError' | 'ArchiveLinkSuccess', ParentType, ContextType>;
};

export type ArchiveLinkSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArchiveLinkSuccess'] = ResolversParentTypes['ArchiveLinkSuccess']> = {
  linkId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentReader?: Resolver<ResolversTypes['ContentReader'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directionality?: Resolver<Maybe<ResolversTypes['DirectionalityType']>, ParentType, ContextType>;
  feedContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  highlights?: Resolver<Array<ResolversTypes['Highlight']>, ParentType, ContextType, Partial<ArticleHighlightsArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['Label']>>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  originalArticleUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pageType?: Resolver<Maybe<ResolversTypes['PageType']>, ParentType, ContextType>;
  postedByViewer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  readAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  readingProgressAnchorIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  readingProgressPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  readingProgressTopPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<Array<ResolversTypes['Recommendation']>>, ParentType, ContextType>;
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  savedByViewer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shareInfo?: Resolver<Maybe<ResolversTypes['LinkShareInfo']>, ParentType, ContextType>;
  sharedComment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showTranslated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  siteIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['ArticleSavingRequestStatus']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translatedContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translatedLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translationStatus?: Resolver<Maybe<ResolversTypes['TranslationStatus']>, ParentType, ContextType>;
  unsubHttpUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubMailTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wordsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleEdge'] = ResolversParentTypes['ArticleEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleError'] = ResolversParentTypes['ArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleResult'] = ResolversParentTypes['ArticleResult']> = {
  __resolveType: TypeResolveFn<'ArticleError' | 'ArticleSuccess', ParentType, ContextType>;
};

export type ArticleSavingRequestResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleSavingRequest'] = ResolversParentTypes['ArticleSavingRequest']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  errorCode?: Resolver<Maybe<ResolversTypes['CreateArticleErrorCode']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ArticleSavingRequestStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleSavingRequestErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleSavingRequestError'] = ResolversParentTypes['ArticleSavingRequestError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ArticleSavingRequestErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleSavingRequestResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleSavingRequestResult'] = ResolversParentTypes['ArticleSavingRequestResult']> = {
  __resolveType: TypeResolveFn<'ArticleSavingRequestError' | 'ArticleSavingRequestSuccess', ParentType, ContextType>;
};

export type ArticleSavingRequestSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleSavingRequestSuccess'] = ResolversParentTypes['ArticleSavingRequestSuccess']> = {
  articleSavingRequest?: Resolver<ResolversTypes['ArticleSavingRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticleSuccess'] = ResolversParentTypes['ArticleSuccess']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticlesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticlesError'] = ResolversParentTypes['ArticlesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ArticlesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticlesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticlesResult'] = ResolversParentTypes['ArticlesResult']> = {
  __resolveType: TypeResolveFn<'ArticlesError' | 'ArticlesSuccess', ParentType, ContextType>;
};

export type ArticlesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ArticlesSuccess'] = ResolversParentTypes['ArticlesSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['ArticleEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BulkActionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BulkActionError'] = ResolversParentTypes['BulkActionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['BulkActionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BulkActionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BulkActionResult'] = ResolversParentTypes['BulkActionResult']> = {
  __resolveType: TypeResolveFn<'BulkActionError' | 'BulkActionSuccess', ParentType, ContextType>;
};

export type BulkActionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BulkActionSuccess'] = ResolversParentTypes['BulkActionSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleError'] = ResolversParentTypes['CreateArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleResult'] = ResolversParentTypes['CreateArticleResult']> = {
  __resolveType: TypeResolveFn<'CreateArticleError' | 'CreateArticleSuccess', ParentType, ContextType>;
};

export type CreateArticleSavingRequestErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleSavingRequestError'] = ResolversParentTypes['CreateArticleSavingRequestError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateArticleSavingRequestErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleSavingRequestResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleSavingRequestResult'] = ResolversParentTypes['CreateArticleSavingRequestResult']> = {
  __resolveType: TypeResolveFn<'CreateArticleSavingRequestError' | 'CreateArticleSavingRequestSuccess', ParentType, ContextType>;
};

export type CreateArticleSavingRequestSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleSavingRequestSuccess'] = ResolversParentTypes['CreateArticleSavingRequestSuccess']> = {
  articleSavingRequest?: Resolver<ResolversTypes['ArticleSavingRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateArticleSuccess'] = ResolversParentTypes['CreateArticleSuccess']> = {
  created?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFolderPolicyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateFolderPolicyError'] = ResolversParentTypes['CreateFolderPolicyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateFolderPolicyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFolderPolicyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateFolderPolicyResult'] = ResolversParentTypes['CreateFolderPolicyResult']> = {
  __resolveType: TypeResolveFn<'CreateFolderPolicyError' | 'CreateFolderPolicySuccess', ParentType, ContextType>;
};

export type CreateFolderPolicySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateFolderPolicySuccess'] = ResolversParentTypes['CreateFolderPolicySuccess']> = {
  policy?: Resolver<ResolversTypes['FolderPolicy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGroupErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateGroupError'] = ResolversParentTypes['CreateGroupError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateGroupErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGroupResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateGroupResult'] = ResolversParentTypes['CreateGroupResult']> = {
  __resolveType: TypeResolveFn<'CreateGroupError' | 'CreateGroupSuccess', ParentType, ContextType>;
};

export type CreateGroupSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateGroupSuccess'] = ResolversParentTypes['CreateGroupSuccess']> = {
  group?: Resolver<ResolversTypes['RecommendationGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateHighlightErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightError'] = ResolversParentTypes['CreateHighlightError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateHighlightErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateHighlightReplyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightReplyError'] = ResolversParentTypes['CreateHighlightReplyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateHighlightReplyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateHighlightReplyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightReplyResult'] = ResolversParentTypes['CreateHighlightReplyResult']> = {
  __resolveType: TypeResolveFn<'CreateHighlightReplyError' | 'CreateHighlightReplySuccess', ParentType, ContextType>;
};

export type CreateHighlightReplySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightReplySuccess'] = ResolversParentTypes['CreateHighlightReplySuccess']> = {
  highlightReply?: Resolver<ResolversTypes['HighlightReply'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateHighlightResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightResult'] = ResolversParentTypes['CreateHighlightResult']> = {
  __resolveType: TypeResolveFn<'CreateHighlightError' | 'CreateHighlightSuccess', ParentType, ContextType>;
};

export type CreateHighlightSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateHighlightSuccess'] = ResolversParentTypes['CreateHighlightSuccess']> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLabelErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateLabelError'] = ResolversParentTypes['CreateLabelError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateLabelErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLabelResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateLabelResult'] = ResolversParentTypes['CreateLabelResult']> = {
  __resolveType: TypeResolveFn<'CreateLabelError' | 'CreateLabelSuccess', ParentType, ContextType>;
};

export type CreateLabelSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateLabelSuccess'] = ResolversParentTypes['CreateLabelSuccess']> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateNewsletterEmailErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateNewsletterEmailError'] = ResolversParentTypes['CreateNewsletterEmailError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateNewsletterEmailErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateNewsletterEmailResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateNewsletterEmailResult'] = ResolversParentTypes['CreateNewsletterEmailResult']> = {
  __resolveType: TypeResolveFn<'CreateNewsletterEmailError' | 'CreateNewsletterEmailSuccess', ParentType, ContextType>;
};

export type CreateNewsletterEmailSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateNewsletterEmailSuccess'] = ResolversParentTypes['CreateNewsletterEmailSuccess']> = {
  newsletterEmail?: Resolver<ResolversTypes['NewsletterEmail'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreatePostError'] = ResolversParentTypes['CreatePostError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreatePostErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreatePostResult'] = ResolversParentTypes['CreatePostResult']> = {
  __resolveType: TypeResolveFn<'CreatePostError' | 'CreatePostSuccess', ParentType, ContextType>;
};

export type CreatePostSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreatePostSuccess'] = ResolversParentTypes['CreatePostSuccess']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateReactionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReactionError'] = ResolversParentTypes['CreateReactionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateReactionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateReactionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReactionResult'] = ResolversParentTypes['CreateReactionResult']> = {
  __resolveType: TypeResolveFn<'CreateReactionError' | 'CreateReactionSuccess', ParentType, ContextType>;
};

export type CreateReactionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReactionSuccess'] = ResolversParentTypes['CreateReactionSuccess']> = {
  reaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateReminderErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReminderError'] = ResolversParentTypes['CreateReminderError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['CreateReminderErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateReminderResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReminderResult'] = ResolversParentTypes['CreateReminderResult']> = {
  __resolveType: TypeResolveFn<'CreateReminderError' | 'CreateReminderSuccess', ParentType, ContextType>;
};

export type CreateReminderSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateReminderSuccess'] = ResolversParentTypes['CreateReminderSuccess']> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteAccountErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteAccountError'] = ResolversParentTypes['DeleteAccountError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteAccountErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteAccountResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteAccountResult'] = ResolversParentTypes['DeleteAccountResult']> = {
  __resolveType: TypeResolveFn<'DeleteAccountError' | 'DeleteAccountSuccess', ParentType, ContextType>;
};

export type DeleteAccountSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteAccountSuccess'] = ResolversParentTypes['DeleteAccountSuccess']> = {
  userID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteDiscoverArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverArticleError'] = ResolversParentTypes['DeleteDiscoverArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteDiscoverArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteDiscoverArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverArticleResult'] = ResolversParentTypes['DeleteDiscoverArticleResult']> = {
  __resolveType: TypeResolveFn<'DeleteDiscoverArticleError' | 'DeleteDiscoverArticleSuccess', ParentType, ContextType>;
};

export type DeleteDiscoverArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverArticleSuccess'] = ResolversParentTypes['DeleteDiscoverArticleSuccess']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteDiscoverFeedErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverFeedError'] = ResolversParentTypes['DeleteDiscoverFeedError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteDiscoverFeedErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteDiscoverFeedResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverFeedResult'] = ResolversParentTypes['DeleteDiscoverFeedResult']> = {
  __resolveType: TypeResolveFn<'DeleteDiscoverFeedError' | 'DeleteDiscoverFeedSuccess', ParentType, ContextType>;
};

export type DeleteDiscoverFeedSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteDiscoverFeedSuccess'] = ResolversParentTypes['DeleteDiscoverFeedSuccess']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFilterErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFilterError'] = ResolversParentTypes['DeleteFilterError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteFilterErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFilterResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFilterResult'] = ResolversParentTypes['DeleteFilterResult']> = {
  __resolveType: TypeResolveFn<'DeleteFilterError' | 'DeleteFilterSuccess', ParentType, ContextType>;
};

export type DeleteFilterSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFilterSuccess'] = ResolversParentTypes['DeleteFilterSuccess']> = {
  filter?: Resolver<ResolversTypes['Filter'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFolderPolicyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFolderPolicyError'] = ResolversParentTypes['DeleteFolderPolicyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteFolderPolicyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFolderPolicyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFolderPolicyResult'] = ResolversParentTypes['DeleteFolderPolicyResult']> = {
  __resolveType: TypeResolveFn<'DeleteFolderPolicyError' | 'DeleteFolderPolicySuccess', ParentType, ContextType>;
};

export type DeleteFolderPolicySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteFolderPolicySuccess'] = ResolversParentTypes['DeleteFolderPolicySuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteHighlightErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightError'] = ResolversParentTypes['DeleteHighlightError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteHighlightErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteHighlightReplyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightReplyError'] = ResolversParentTypes['DeleteHighlightReplyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteHighlightReplyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteHighlightReplyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightReplyResult'] = ResolversParentTypes['DeleteHighlightReplyResult']> = {
  __resolveType: TypeResolveFn<'DeleteHighlightReplyError' | 'DeleteHighlightReplySuccess', ParentType, ContextType>;
};

export type DeleteHighlightReplySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightReplySuccess'] = ResolversParentTypes['DeleteHighlightReplySuccess']> = {
  highlightReply?: Resolver<ResolversTypes['HighlightReply'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteHighlightResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightResult'] = ResolversParentTypes['DeleteHighlightResult']> = {
  __resolveType: TypeResolveFn<'DeleteHighlightError' | 'DeleteHighlightSuccess', ParentType, ContextType>;
};

export type DeleteHighlightSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteHighlightSuccess'] = ResolversParentTypes['DeleteHighlightSuccess']> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteIntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteIntegrationError'] = ResolversParentTypes['DeleteIntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteIntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteIntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteIntegrationResult'] = ResolversParentTypes['DeleteIntegrationResult']> = {
  __resolveType: TypeResolveFn<'DeleteIntegrationError' | 'DeleteIntegrationSuccess', ParentType, ContextType>;
};

export type DeleteIntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteIntegrationSuccess'] = ResolversParentTypes['DeleteIntegrationSuccess']> = {
  integration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLabelErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteLabelError'] = ResolversParentTypes['DeleteLabelError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteLabelErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLabelResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteLabelResult'] = ResolversParentTypes['DeleteLabelResult']> = {
  __resolveType: TypeResolveFn<'DeleteLabelError' | 'DeleteLabelSuccess', ParentType, ContextType>;
};

export type DeleteLabelSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteLabelSuccess'] = ResolversParentTypes['DeleteLabelSuccess']> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteNewsletterEmailErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteNewsletterEmailError'] = ResolversParentTypes['DeleteNewsletterEmailError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteNewsletterEmailErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteNewsletterEmailResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteNewsletterEmailResult'] = ResolversParentTypes['DeleteNewsletterEmailResult']> = {
  __resolveType: TypeResolveFn<'DeleteNewsletterEmailError' | 'DeleteNewsletterEmailSuccess', ParentType, ContextType>;
};

export type DeleteNewsletterEmailSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteNewsletterEmailSuccess'] = ResolversParentTypes['DeleteNewsletterEmailSuccess']> = {
  newsletterEmail?: Resolver<ResolversTypes['NewsletterEmail'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePostErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeletePostError'] = ResolversParentTypes['DeletePostError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeletePostErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePostResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeletePostResult'] = ResolversParentTypes['DeletePostResult']> = {
  __resolveType: TypeResolveFn<'DeletePostError' | 'DeletePostSuccess', ParentType, ContextType>;
};

export type DeletePostSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeletePostSuccess'] = ResolversParentTypes['DeletePostSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteReactionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReactionError'] = ResolversParentTypes['DeleteReactionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteReactionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteReactionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReactionResult'] = ResolversParentTypes['DeleteReactionResult']> = {
  __resolveType: TypeResolveFn<'DeleteReactionError' | 'DeleteReactionSuccess', ParentType, ContextType>;
};

export type DeleteReactionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReactionSuccess'] = ResolversParentTypes['DeleteReactionSuccess']> = {
  reaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteReminderErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReminderError'] = ResolversParentTypes['DeleteReminderError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteReminderErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteReminderResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReminderResult'] = ResolversParentTypes['DeleteReminderResult']> = {
  __resolveType: TypeResolveFn<'DeleteReminderError' | 'DeleteReminderSuccess', ParentType, ContextType>;
};

export type DeleteReminderSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteReminderSuccess'] = ResolversParentTypes['DeleteReminderSuccess']> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteRuleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteRuleError'] = ResolversParentTypes['DeleteRuleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteRuleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteRuleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteRuleResult'] = ResolversParentTypes['DeleteRuleResult']> = {
  __resolveType: TypeResolveFn<'DeleteRuleError' | 'DeleteRuleSuccess', ParentType, ContextType>;
};

export type DeleteRuleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteRuleSuccess'] = ResolversParentTypes['DeleteRuleSuccess']> = {
  rule?: Resolver<ResolversTypes['Rule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWebhookErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteWebhookError'] = ResolversParentTypes['DeleteWebhookError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeleteWebhookErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWebhookResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteWebhookResult'] = ResolversParentTypes['DeleteWebhookResult']> = {
  __resolveType: TypeResolveFn<'DeleteWebhookError' | 'DeleteWebhookSuccess', ParentType, ContextType>;
};

export type DeleteWebhookSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeleteWebhookSuccess'] = ResolversParentTypes['DeleteWebhookSuccess']> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceTokenResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeviceToken'] = ResolversParentTypes['DeviceToken']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceTokensErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeviceTokensError'] = ResolversParentTypes['DeviceTokensError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DeviceTokensErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceTokensResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeviceTokensResult'] = ResolversParentTypes['DeviceTokensResult']> = {
  __resolveType: TypeResolveFn<'DeviceTokensError' | 'DeviceTokensSuccess', ParentType, ContextType>;
};

export type DeviceTokensSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DeviceTokensSuccess'] = ResolversParentTypes['DeviceTokensSuccess']> = {
  deviceTokens?: Resolver<Array<ResolversTypes['DeviceToken']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DigestConfigResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DigestConfig'] = ResolversParentTypes['DigestConfig']> = {
  channels?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoverFeedResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverFeed'] = ResolversParentTypes['DiscoverFeed']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visibleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoverFeedArticleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverFeedArticle'] = ResolversParentTypes['DiscoverFeedArticle']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  savedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  savedLinkUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoverFeedErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverFeedError'] = ResolversParentTypes['DiscoverFeedError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['DiscoverFeedErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoverFeedResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverFeedResult'] = ResolversParentTypes['DiscoverFeedResult']> = {
  __resolveType: TypeResolveFn<'DiscoverFeedError' | 'DiscoverFeedSuccess', ParentType, ContextType>;
};

export type DiscoverFeedSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverFeedSuccess'] = ResolversParentTypes['DiscoverFeedSuccess']> = {
  feeds?: Resolver<Array<Maybe<ResolversTypes['DiscoverFeed']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoverTopicResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['DiscoverTopic'] = ResolversParentTypes['DiscoverTopic']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditDiscoverFeedErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EditDiscoverFeedError'] = ResolversParentTypes['EditDiscoverFeedError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['EditDiscoverFeedErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditDiscoverFeedResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EditDiscoverFeedResult'] = ResolversParentTypes['EditDiscoverFeedResult']> = {
  __resolveType: TypeResolveFn<'EditDiscoverFeedError' | 'EditDiscoverFeedSuccess', ParentType, ContextType>;
};

export type EditDiscoverFeedSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EditDiscoverFeedSuccess'] = ResolversParentTypes['EditDiscoverFeedSuccess']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmptyTrashErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EmptyTrashError'] = ResolversParentTypes['EmptyTrashError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['EmptyTrashErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmptyTrashResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EmptyTrashResult'] = ResolversParentTypes['EmptyTrashResult']> = {
  __resolveType: TypeResolveFn<'EmptyTrashError' | 'EmptyTrashSuccess', ParentType, ContextType>;
};

export type EmptyTrashSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['EmptyTrashSuccess'] = ResolversParentTypes['EmptyTrashSuccess']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportToIntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ExportToIntegrationError'] = ResolversParentTypes['ExportToIntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ExportToIntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportToIntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ExportToIntegrationResult'] = ResolversParentTypes['ExportToIntegrationResult']> = {
  __resolveType: TypeResolveFn<'ExportToIntegrationError' | 'ExportToIntegrationSuccess', ParentType, ContextType>;
};

export type ExportToIntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ExportToIntegrationSuccess'] = ResolversParentTypes['ExportToIntegrationSuccess']> = {
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  grantedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedArticleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedArticle'] = ResolversParentTypes['FeedArticle']> = {
  annotationsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  highlight?: Resolver<Maybe<ResolversTypes['Highlight']>, ParentType, ContextType>;
  highlightsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>;
  sharedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  sharedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sharedComment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharedWithHighlights?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedArticleEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedArticleEdge'] = ResolversParentTypes['FeedArticleEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FeedArticle'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedArticlesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedArticlesError'] = ResolversParentTypes['FeedArticlesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['FeedArticlesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedArticlesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedArticlesResult'] = ResolversParentTypes['FeedArticlesResult']> = {
  __resolveType: TypeResolveFn<'FeedArticlesError' | 'FeedArticlesSuccess', ParentType, ContextType>;
};

export type FeedArticlesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedArticlesSuccess'] = ResolversParentTypes['FeedArticlesSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['FeedArticleEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedEdge'] = ResolversParentTypes['FeedEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Feed'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedsError'] = ResolversParentTypes['FeedsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['FeedsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedsResult'] = ResolversParentTypes['FeedsResult']> = {
  __resolveType: TypeResolveFn<'FeedsError' | 'FeedsSuccess', ParentType, ContextType>;
};

export type FeedsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FeedsSuccess'] = ResolversParentTypes['FeedsSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['FeedEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchContentErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FetchContentError'] = ResolversParentTypes['FetchContentError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['FetchContentErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchContentResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FetchContentResult'] = ResolversParentTypes['FetchContentResult']> = {
  __resolveType: TypeResolveFn<'FetchContentError' | 'FetchContentSuccess', ParentType, ContextType>;
};

export type FetchContentSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FetchContentSuccess'] = ResolversParentTypes['FetchContentSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Filter'] = ResolversParentTypes['Filter']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  defaultFilter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  visible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FiltersErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FiltersError'] = ResolversParentTypes['FiltersError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['FiltersErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FiltersResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FiltersResult'] = ResolversParentTypes['FiltersResult']> = {
  __resolveType: TypeResolveFn<'FiltersError' | 'FiltersSuccess', ParentType, ContextType>;
};

export type FiltersSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FiltersSuccess'] = ResolversParentTypes['FiltersSuccess']> = {
  filters?: Resolver<Array<ResolversTypes['Filter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderPoliciesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FolderPoliciesError'] = ResolversParentTypes['FolderPoliciesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['FolderPoliciesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderPoliciesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FolderPoliciesResult'] = ResolversParentTypes['FolderPoliciesResult']> = {
  __resolveType: TypeResolveFn<'FolderPoliciesError' | 'FolderPoliciesSuccess', ParentType, ContextType>;
};

export type FolderPoliciesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FolderPoliciesSuccess'] = ResolversParentTypes['FolderPoliciesSuccess']> = {
  policies?: Resolver<Array<ResolversTypes['FolderPolicy']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderPolicyResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['FolderPolicy'] = ResolversParentTypes['FolderPolicy']> = {
  action?: Resolver<ResolversTypes['FolderPolicyAction'], ParentType, ContextType>;
  afterDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateAnkiCardsBatchErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsBatchError'] = ResolversParentTypes['GenerateAnkiCardsBatchError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GenerateAnkiCardsBatchErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateAnkiCardsBatchResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsBatchResult'] = ResolversParentTypes['GenerateAnkiCardsBatchResult']> = {
  __resolveType: TypeResolveFn<'GenerateAnkiCardsBatchError' | 'GenerateAnkiCardsBatchSuccess', ParentType, ContextType>;
};

export type GenerateAnkiCardsBatchSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsBatchSuccess'] = ResolversParentTypes['GenerateAnkiCardsBatchSuccess']> = {
  jobsEnqueued?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateAnkiCardsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsError'] = ResolversParentTypes['GenerateAnkiCardsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GenerateAnkiCardsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateAnkiCardsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsResult'] = ResolversParentTypes['GenerateAnkiCardsResult']> = {
  __resolveType: TypeResolveFn<'GenerateAnkiCardsError' | 'GenerateAnkiCardsSuccess', ParentType, ContextType>;
};

export type GenerateAnkiCardsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateAnkiCardsSuccess'] = ResolversParentTypes['GenerateAnkiCardsSuccess']> = {
  batch?: Resolver<ResolversTypes['AnkiCardBatch'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateApiKeyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateApiKeyError'] = ResolversParentTypes['GenerateApiKeyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GenerateApiKeyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateApiKeyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateApiKeyResult'] = ResolversParentTypes['GenerateApiKeyResult']> = {
  __resolveType: TypeResolveFn<'GenerateApiKeyError' | 'GenerateApiKeySuccess', ParentType, ContextType>;
};

export type GenerateApiKeySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GenerateApiKeySuccess'] = ResolversParentTypes['GenerateApiKeySuccess']> = {
  apiKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetDiscoverFeedArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverFeedArticleError'] = ResolversParentTypes['GetDiscoverFeedArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GetDiscoverFeedArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetDiscoverFeedArticleResultsResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverFeedArticleResults'] = ResolversParentTypes['GetDiscoverFeedArticleResults']> = {
  __resolveType: TypeResolveFn<'GetDiscoverFeedArticleError' | 'GetDiscoverFeedArticleSuccess', ParentType, ContextType>;
};

export type GetDiscoverFeedArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverFeedArticleSuccess'] = ResolversParentTypes['GetDiscoverFeedArticleSuccess']> = {
  discoverArticles?: Resolver<Maybe<Array<Maybe<ResolversTypes['DiscoverFeedArticle']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetDiscoverTopicErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverTopicError'] = ResolversParentTypes['GetDiscoverTopicError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GetDiscoverTopicErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetDiscoverTopicResultsResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverTopicResults'] = ResolversParentTypes['GetDiscoverTopicResults']> = {
  __resolveType: TypeResolveFn<'GetDiscoverTopicError' | 'GetDiscoverTopicSuccess', ParentType, ContextType>;
};

export type GetDiscoverTopicSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetDiscoverTopicSuccess'] = ResolversParentTypes['GetDiscoverTopicSuccess']> = {
  discoverTopics?: Resolver<Maybe<Array<ResolversTypes['DiscoverTopic']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFollowersErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowersError'] = ResolversParentTypes['GetFollowersError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GetFollowersErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFollowersResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowersResult'] = ResolversParentTypes['GetFollowersResult']> = {
  __resolveType: TypeResolveFn<'GetFollowersError' | 'GetFollowersSuccess', ParentType, ContextType>;
};

export type GetFollowersSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowersSuccess'] = ResolversParentTypes['GetFollowersSuccess']> = {
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFollowingErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowingError'] = ResolversParentTypes['GetFollowingError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GetFollowingErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFollowingResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowingResult'] = ResolversParentTypes['GetFollowingResult']> = {
  __resolveType: TypeResolveFn<'GetFollowingError' | 'GetFollowingSuccess', ParentType, ContextType>;
};

export type GetFollowingSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetFollowingSuccess'] = ResolversParentTypes['GetFollowingSuccess']> = {
  following?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserPersonalizationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetUserPersonalizationError'] = ResolversParentTypes['GetUserPersonalizationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GetUserPersonalizationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserPersonalizationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetUserPersonalizationResult'] = ResolversParentTypes['GetUserPersonalizationResult']> = {
  __resolveType: TypeResolveFn<'GetUserPersonalizationError' | 'GetUserPersonalizationSuccess', ParentType, ContextType>;
};

export type GetUserPersonalizationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GetUserPersonalizationSuccess'] = ResolversParentTypes['GetUserPersonalizationSuccess']> = {
  userPersonalization?: Resolver<Maybe<ResolversTypes['UserPersonalization']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleSignupErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GoogleSignupError'] = ResolversParentTypes['GoogleSignupError']> = {
  errorCodes?: Resolver<Array<Maybe<ResolversTypes['SignupErrorCode']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleSignupResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GoogleSignupResult'] = ResolversParentTypes['GoogleSignupResult']> = {
  __resolveType: TypeResolveFn<'GoogleSignupError' | 'GoogleSignupSuccess', ParentType, ContextType>;
};

export type GoogleSignupSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GoogleSignupSuccess'] = ResolversParentTypes['GoogleSignupSuccess']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GroupsError'] = ResolversParentTypes['GroupsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['GroupsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GroupsResult'] = ResolversParentTypes['GroupsResult']> = {
  __resolveType: TypeResolveFn<'GroupsError' | 'GroupsSuccess', ParentType, ContextType>;
};

export type GroupsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['GroupsSuccess'] = ResolversParentTypes['GroupsSuccess']> = {
  groups?: Resolver<Array<ResolversTypes['RecommendationGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HiddenHomeSectionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HiddenHomeSectionError'] = ResolversParentTypes['HiddenHomeSectionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['HiddenHomeSectionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HiddenHomeSectionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HiddenHomeSectionResult'] = ResolversParentTypes['HiddenHomeSectionResult']> = {
  __resolveType: TypeResolveFn<'HiddenHomeSectionError' | 'HiddenHomeSectionSuccess', ParentType, ContextType>;
};

export type HiddenHomeSectionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HiddenHomeSectionSuccess'] = ResolversParentTypes['HiddenHomeSectionSuccess']> = {
  section?: Resolver<Maybe<ResolversTypes['HomeSection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Highlight'] = ResolversParentTypes['Highlight']> = {
  annotation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  createdByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  highlightPositionAnchorIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  highlightPositionPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  html?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['Label']>>, ParentType, ContextType>;
  libraryItem?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  patch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['HighlightReply']>, ParentType, ContextType>;
  representation?: Resolver<ResolversTypes['RepresentationType'], ParentType, ContextType>;
  sharedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shortId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['HighlightType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightEdge'] = ResolversParentTypes['HighlightEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightReplyResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightReply'] = ResolversParentTypes['HighlightReply']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightStatsResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightStats'] = ResolversParentTypes['HighlightStats']> = {
  highlightCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightsError'] = ResolversParentTypes['HighlightsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['HighlightsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightsResult'] = ResolversParentTypes['HighlightsResult']> = {
  __resolveType: TypeResolveFn<'HighlightsError' | 'HighlightsSuccess', ParentType, ContextType>;
};

export type HighlightsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HighlightsSuccess'] = ResolversParentTypes['HighlightsSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['HighlightEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeEdge'] = ResolversParentTypes['HomeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['HomeSection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeError'] = ResolversParentTypes['HomeError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['HomeErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeItem'] = ResolversParentTypes['HomeItem']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  broadcastCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  canArchive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canMove?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canSave?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canShare?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previewContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  saveCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seen_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['HomeItemSource']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wordCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeItemSourceResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeItemSource'] = ResolversParentTypes['HomeItemSource']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['HomeItemSourceType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeResult'] = ResolversParentTypes['HomeResult']> = {
  __resolveType: TypeResolveFn<'HomeError' | 'HomeSuccess', ParentType, ContextType>;
};

export type HomeSectionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeSection'] = ResolversParentTypes['HomeSection']> = {
  items?: Resolver<Array<ResolversTypes['HomeItem']>, ParentType, ContextType>;
  layout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['HomeSuccess'] = ResolversParentTypes['HomeSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['HomeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportFromIntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ImportFromIntegrationError'] = ResolversParentTypes['ImportFromIntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ImportFromIntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportFromIntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ImportFromIntegrationResult'] = ResolversParentTypes['ImportFromIntegrationResult']> = {
  __resolveType: TypeResolveFn<'ImportFromIntegrationError' | 'ImportFromIntegrationSuccess', ParentType, ContextType>;
};

export type ImportFromIntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ImportFromIntegrationSuccess'] = ResolversParentTypes['ImportFromIntegrationSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Integration'] = ResolversParentTypes['Integration']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  taskName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['IntegrationType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationError'] = ResolversParentTypes['IntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['IntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationResult'] = ResolversParentTypes['IntegrationResult']> = {
  __resolveType: TypeResolveFn<'IntegrationError' | 'IntegrationSuccess', ParentType, ContextType>;
};

export type IntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationSuccess'] = ResolversParentTypes['IntegrationSuccess']> = {
  integration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationsError'] = ResolversParentTypes['IntegrationsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['IntegrationsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegrationsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationsResult'] = ResolversParentTypes['IntegrationsResult']> = {
  __resolveType: TypeResolveFn<'IntegrationsError' | 'IntegrationsSuccess', ParentType, ContextType>;
};

export type IntegrationsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntegrationsSuccess'] = ResolversParentTypes['IntegrationsSuccess']> = {
  integrations?: Resolver<Array<ResolversTypes['Integration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type JoinGroupErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['JoinGroupError'] = ResolversParentTypes['JoinGroupError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['JoinGroupErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinGroupResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['JoinGroupResult'] = ResolversParentTypes['JoinGroupResult']> = {
  __resolveType: TypeResolveFn<'JoinGroupError' | 'JoinGroupSuccess', ParentType, ContextType>;
};

export type JoinGroupSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['JoinGroupSuccess'] = ResolversParentTypes['JoinGroupSuccess']> = {
  group?: Resolver<ResolversTypes['RecommendationGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  internal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LabelsError'] = ResolversParentTypes['LabelsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['LabelsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LabelsResult'] = ResolversParentTypes['LabelsResult']> = {
  __resolveType: TypeResolveFn<'LabelsError' | 'LabelsSuccess', ParentType, ContextType>;
};

export type LabelsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LabelsSuccess'] = ResolversParentTypes['LabelsSuccess']> = {
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveGroupErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LeaveGroupError'] = ResolversParentTypes['LeaveGroupError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['LeaveGroupErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveGroupResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LeaveGroupResult'] = ResolversParentTypes['LeaveGroupResult']> = {
  __resolveType: TypeResolveFn<'LeaveGroupError' | 'LeaveGroupSuccess', ParentType, ContextType>;
};

export type LeaveGroupSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LeaveGroupSuccess'] = ResolversParentTypes['LeaveGroupSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  highlightStats?: Resolver<ResolversTypes['HighlightStats'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  postedByViewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  readState?: Resolver<ResolversTypes['ReadState'], ParentType, ContextType>;
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  savedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  savedByViewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shareInfo?: Resolver<ResolversTypes['LinkShareInfo'], ParentType, ContextType>;
  shareStats?: Resolver<ResolversTypes['ShareStats'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkShareInfoResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LinkShareInfo'] = ResolversParentTypes['LinkShareInfo']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogOutErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LogOutError'] = ResolversParentTypes['LogOutError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['LogOutErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogOutResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LogOutResult'] = ResolversParentTypes['LogOutResult']> = {
  __resolveType: TypeResolveFn<'LogOutError' | 'LogOutSuccess', ParentType, ContextType>;
};

export type LogOutSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LogOutSuccess'] = ResolversParentTypes['LogOutSuccess']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['LoginErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'LoginError' | 'LoginSuccess', ParentType, ContextType>;
};

export type LoginSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['LoginSuccess'] = ResolversParentTypes['LoginSuccess']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkEmailAsItemErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MarkEmailAsItemError'] = ResolversParentTypes['MarkEmailAsItemError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['MarkEmailAsItemErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkEmailAsItemResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MarkEmailAsItemResult'] = ResolversParentTypes['MarkEmailAsItemResult']> = {
  __resolveType: TypeResolveFn<'MarkEmailAsItemError' | 'MarkEmailAsItemSuccess', ParentType, ContextType>;
};

export type MarkEmailAsItemSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MarkEmailAsItemSuccess'] = ResolversParentTypes['MarkEmailAsItemSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MergeHighlightErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MergeHighlightError'] = ResolversParentTypes['MergeHighlightError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['MergeHighlightErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MergeHighlightResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MergeHighlightResult'] = ResolversParentTypes['MergeHighlightResult']> = {
  __resolveType: TypeResolveFn<'MergeHighlightError' | 'MergeHighlightSuccess', ParentType, ContextType>;
};

export type MergeHighlightSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MergeHighlightSuccess'] = ResolversParentTypes['MergeHighlightSuccess']> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  overlapHighlightIdList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveFilterErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveFilterError'] = ResolversParentTypes['MoveFilterError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['MoveFilterErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveFilterResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveFilterResult'] = ResolversParentTypes['MoveFilterResult']> = {
  __resolveType: TypeResolveFn<'MoveFilterError' | 'MoveFilterSuccess', ParentType, ContextType>;
};

export type MoveFilterSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveFilterSuccess'] = ResolversParentTypes['MoveFilterSuccess']> = {
  filter?: Resolver<ResolversTypes['Filter'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveLabelErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveLabelError'] = ResolversParentTypes['MoveLabelError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['MoveLabelErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveLabelResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveLabelResult'] = ResolversParentTypes['MoveLabelResult']> = {
  __resolveType: TypeResolveFn<'MoveLabelError' | 'MoveLabelSuccess', ParentType, ContextType>;
};

export type MoveLabelSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveLabelSuccess'] = ResolversParentTypes['MoveLabelSuccess']> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveToFolderErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveToFolderError'] = ResolversParentTypes['MoveToFolderError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['MoveToFolderErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveToFolderResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveToFolderResult'] = ResolversParentTypes['MoveToFolderResult']> = {
  __resolveType: TypeResolveFn<'MoveToFolderError' | 'MoveToFolderSuccess', ParentType, ContextType>;
};

export type MoveToFolderSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['MoveToFolderSuccess'] = ResolversParentTypes['MoveToFolderSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDiscoverFeed?: Resolver<ResolversTypes['AddDiscoverFeedResult'], ParentType, ContextType, RequireFields<MutationAddDiscoverFeedArgs, 'input'>>;
  addPopularRead?: Resolver<ResolversTypes['AddPopularReadResult'], ParentType, ContextType, RequireFields<MutationAddPopularReadArgs, 'name'>>;
  bulkAction?: Resolver<ResolversTypes['BulkActionResult'], ParentType, ContextType, RequireFields<MutationBulkActionArgs, 'action' | 'query'>>;
  createArticle?: Resolver<ResolversTypes['CreateArticleResult'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'input'>>;
  createArticleSavingRequest?: Resolver<ResolversTypes['CreateArticleSavingRequestResult'], ParentType, ContextType, RequireFields<MutationCreateArticleSavingRequestArgs, 'input'>>;
  createFolderPolicy?: Resolver<ResolversTypes['CreateFolderPolicyResult'], ParentType, ContextType, RequireFields<MutationCreateFolderPolicyArgs, 'input'>>;
  createGroup?: Resolver<ResolversTypes['CreateGroupResult'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'input'>>;
  createHighlight?: Resolver<ResolversTypes['CreateHighlightResult'], ParentType, ContextType, RequireFields<MutationCreateHighlightArgs, 'input'>>;
  createLabel?: Resolver<ResolversTypes['CreateLabelResult'], ParentType, ContextType, RequireFields<MutationCreateLabelArgs, 'input'>>;
  createNewsletterEmail?: Resolver<ResolversTypes['CreateNewsletterEmailResult'], ParentType, ContextType, Partial<MutationCreateNewsletterEmailArgs>>;
  createPost?: Resolver<ResolversTypes['CreatePostResult'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deleteAccount?: Resolver<ResolversTypes['DeleteAccountResult'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'userID'>>;
  deleteDiscoverArticle?: Resolver<ResolversTypes['DeleteDiscoverArticleResult'], ParentType, ContextType, RequireFields<MutationDeleteDiscoverArticleArgs, 'input'>>;
  deleteDiscoverFeed?: Resolver<ResolversTypes['DeleteDiscoverFeedResult'], ParentType, ContextType, RequireFields<MutationDeleteDiscoverFeedArgs, 'input'>>;
  deleteFilter?: Resolver<ResolversTypes['DeleteFilterResult'], ParentType, ContextType, RequireFields<MutationDeleteFilterArgs, 'id'>>;
  deleteFolderPolicy?: Resolver<ResolversTypes['DeleteFolderPolicyResult'], ParentType, ContextType, RequireFields<MutationDeleteFolderPolicyArgs, 'id'>>;
  deleteHighlight?: Resolver<ResolversTypes['DeleteHighlightResult'], ParentType, ContextType, RequireFields<MutationDeleteHighlightArgs, 'highlightId'>>;
  deleteIntegration?: Resolver<ResolversTypes['DeleteIntegrationResult'], ParentType, ContextType, RequireFields<MutationDeleteIntegrationArgs, 'id'>>;
  deleteLabel?: Resolver<ResolversTypes['DeleteLabelResult'], ParentType, ContextType, RequireFields<MutationDeleteLabelArgs, 'id'>>;
  deleteNewsletterEmail?: Resolver<ResolversTypes['DeleteNewsletterEmailResult'], ParentType, ContextType, RequireFields<MutationDeleteNewsletterEmailArgs, 'newsletterEmailId'>>;
  deletePost?: Resolver<ResolversTypes['DeletePostResult'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteRule?: Resolver<ResolversTypes['DeleteRuleResult'], ParentType, ContextType, RequireFields<MutationDeleteRuleArgs, 'id'>>;
  deleteWebhook?: Resolver<ResolversTypes['DeleteWebhookResult'], ParentType, ContextType, RequireFields<MutationDeleteWebhookArgs, 'id'>>;
  editDiscoverFeed?: Resolver<ResolversTypes['EditDiscoverFeedResult'], ParentType, ContextType, RequireFields<MutationEditDiscoverFeedArgs, 'input'>>;
  emptyTrash?: Resolver<ResolversTypes['EmptyTrashResult'], ParentType, ContextType>;
  exportToIntegration?: Resolver<ResolversTypes['ExportToIntegrationResult'], ParentType, ContextType, RequireFields<MutationExportToIntegrationArgs, 'integrationId'>>;
  fetchContent?: Resolver<ResolversTypes['FetchContentResult'], ParentType, ContextType, RequireFields<MutationFetchContentArgs, 'id'>>;
  generateAnkiCards?: Resolver<ResolversTypes['GenerateAnkiCardsResult'], ParentType, ContextType, RequireFields<MutationGenerateAnkiCardsArgs, 'libraryItemId'>>;
  generateAnkiCardsBatch?: Resolver<ResolversTypes['GenerateAnkiCardsBatchResult'], ParentType, ContextType, RequireFields<MutationGenerateAnkiCardsBatchArgs, 'input'>>;
  generateApiKey?: Resolver<ResolversTypes['GenerateApiKeyResult'], ParentType, ContextType, RequireFields<MutationGenerateApiKeyArgs, 'input'>>;
  googleLogin?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationGoogleLoginArgs, 'input'>>;
  googleSignup?: Resolver<ResolversTypes['GoogleSignupResult'], ParentType, ContextType, RequireFields<MutationGoogleSignupArgs, 'input'>>;
  importFromIntegration?: Resolver<ResolversTypes['ImportFromIntegrationResult'], ParentType, ContextType, RequireFields<MutationImportFromIntegrationArgs, 'integrationId'>>;
  joinGroup?: Resolver<ResolversTypes['JoinGroupResult'], ParentType, ContextType, RequireFields<MutationJoinGroupArgs, 'inviteCode'>>;
  leaveGroup?: Resolver<ResolversTypes['LeaveGroupResult'], ParentType, ContextType, RequireFields<MutationLeaveGroupArgs, 'groupId'>>;
  logOut?: Resolver<ResolversTypes['LogOutResult'], ParentType, ContextType>;
  markEmailAsItem?: Resolver<ResolversTypes['MarkEmailAsItemResult'], ParentType, ContextType, RequireFields<MutationMarkEmailAsItemArgs, 'recentEmailId'>>;
  mergeHighlight?: Resolver<ResolversTypes['MergeHighlightResult'], ParentType, ContextType, RequireFields<MutationMergeHighlightArgs, 'input'>>;
  moveFilter?: Resolver<ResolversTypes['MoveFilterResult'], ParentType, ContextType, RequireFields<MutationMoveFilterArgs, 'input'>>;
  moveLabel?: Resolver<ResolversTypes['MoveLabelResult'], ParentType, ContextType, RequireFields<MutationMoveLabelArgs, 'input'>>;
  moveToFolder?: Resolver<ResolversTypes['MoveToFolderResult'], ParentType, ContextType, RequireFields<MutationMoveToFolderArgs, 'folder' | 'id'>>;
  optInFeature?: Resolver<ResolversTypes['OptInFeatureResult'], ParentType, ContextType, RequireFields<MutationOptInFeatureArgs, 'input'>>;
  recommend?: Resolver<ResolversTypes['RecommendResult'], ParentType, ContextType, RequireFields<MutationRecommendArgs, 'input'>>;
  recommendHighlights?: Resolver<ResolversTypes['RecommendHighlightsResult'], ParentType, ContextType, RequireFields<MutationRecommendHighlightsArgs, 'input'>>;
  refreshHome?: Resolver<ResolversTypes['RefreshHomeResult'], ParentType, ContextType>;
  regenerateAnkiCards?: Resolver<ResolversTypes['RegenerateAnkiCardsResult'], ParentType, ContextType, RequireFields<MutationRegenerateAnkiCardsArgs, 'libraryItemId'>>;
  replyToEmail?: Resolver<ResolversTypes['ReplyToEmailResult'], ParentType, ContextType, RequireFields<MutationReplyToEmailArgs, 'recentEmailId' | 'reply'>>;
  reportItem?: Resolver<ResolversTypes['ReportItemResult'], ParentType, ContextType, RequireFields<MutationReportItemArgs, 'input'>>;
  revokeApiKey?: Resolver<ResolversTypes['RevokeApiKeyResult'], ParentType, ContextType, RequireFields<MutationRevokeApiKeyArgs, 'id'>>;
  saveArticleReadingProgress?: Resolver<ResolversTypes['SaveArticleReadingProgressResult'], ParentType, ContextType, RequireFields<MutationSaveArticleReadingProgressArgs, 'input'>>;
  saveDiscoverArticle?: Resolver<ResolversTypes['SaveDiscoverArticleResult'], ParentType, ContextType, RequireFields<MutationSaveDiscoverArticleArgs, 'input'>>;
  saveFile?: Resolver<ResolversTypes['SaveResult'], ParentType, ContextType, RequireFields<MutationSaveFileArgs, 'input'>>;
  saveFilter?: Resolver<ResolversTypes['SaveFilterResult'], ParentType, ContextType, RequireFields<MutationSaveFilterArgs, 'input'>>;
  savePage?: Resolver<ResolversTypes['SaveResult'], ParentType, ContextType, RequireFields<MutationSavePageArgs, 'input'>>;
  saveUrl?: Resolver<ResolversTypes['SaveResult'], ParentType, ContextType, RequireFields<MutationSaveUrlArgs, 'input'>>;
  setBookmarkArticle?: Resolver<ResolversTypes['SetBookmarkArticleResult'], ParentType, ContextType, RequireFields<MutationSetBookmarkArticleArgs, 'input'>>;
  setDeviceToken?: Resolver<ResolversTypes['SetDeviceTokenResult'], ParentType, ContextType, RequireFields<MutationSetDeviceTokenArgs, 'input'>>;
  setFavoriteArticle?: Resolver<ResolversTypes['SetFavoriteArticleResult'], ParentType, ContextType, RequireFields<MutationSetFavoriteArticleArgs, 'id'>>;
  setIntegration?: Resolver<ResolversTypes['SetIntegrationResult'], ParentType, ContextType, RequireFields<MutationSetIntegrationArgs, 'input'>>;
  setLabels?: Resolver<ResolversTypes['SetLabelsResult'], ParentType, ContextType, RequireFields<MutationSetLabelsArgs, 'input'>>;
  setLabelsForHighlight?: Resolver<ResolversTypes['SetLabelsResult'], ParentType, ContextType, RequireFields<MutationSetLabelsForHighlightArgs, 'input'>>;
  setLinkArchived?: Resolver<ResolversTypes['ArchiveLinkResult'], ParentType, ContextType, RequireFields<MutationSetLinkArchivedArgs, 'input'>>;
  setRule?: Resolver<ResolversTypes['SetRuleResult'], ParentType, ContextType, RequireFields<MutationSetRuleArgs, 'input'>>;
  setShowTranslated?: Resolver<ResolversTypes['SetShowTranslatedResult'], ParentType, ContextType, RequireFields<MutationSetShowTranslatedArgs, 'id' | 'showTranslated'>>;
  setUserPersonalization?: Resolver<ResolversTypes['SetUserPersonalizationResult'], ParentType, ContextType, RequireFields<MutationSetUserPersonalizationArgs, 'input'>>;
  setWebhook?: Resolver<ResolversTypes['SetWebhookResult'], ParentType, ContextType, RequireFields<MutationSetWebhookArgs, 'input'>>;
  subscribe?: Resolver<ResolversTypes['SubscribeResult'], ParentType, ContextType, RequireFields<MutationSubscribeArgs, 'input'>>;
  testAnkiConnection?: Resolver<ResolversTypes['TestAnkiConnectionResult'], ParentType, ContextType, RequireFields<MutationTestAnkiConnectionArgs, 'input'>>;
  unsubscribe?: Resolver<ResolversTypes['UnsubscribeResult'], ParentType, ContextType, RequireFields<MutationUnsubscribeArgs, 'name'>>;
  updateEmail?: Resolver<ResolversTypes['UpdateEmailResult'], ParentType, ContextType, RequireFields<MutationUpdateEmailArgs, 'input'>>;
  updateFilter?: Resolver<ResolversTypes['UpdateFilterResult'], ParentType, ContextType, RequireFields<MutationUpdateFilterArgs, 'input'>>;
  updateFolderPolicy?: Resolver<ResolversTypes['UpdateFolderPolicyResult'], ParentType, ContextType, RequireFields<MutationUpdateFolderPolicyArgs, 'input'>>;
  updateHighlight?: Resolver<ResolversTypes['UpdateHighlightResult'], ParentType, ContextType, RequireFields<MutationUpdateHighlightArgs, 'input'>>;
  updateLabel?: Resolver<ResolversTypes['UpdateLabelResult'], ParentType, ContextType, RequireFields<MutationUpdateLabelArgs, 'input'>>;
  updateNewsletterEmail?: Resolver<ResolversTypes['UpdateNewsletterEmailResult'], ParentType, ContextType, RequireFields<MutationUpdateNewsletterEmailArgs, 'input'>>;
  updatePage?: Resolver<ResolversTypes['UpdatePageResult'], ParentType, ContextType, RequireFields<MutationUpdatePageArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['UpdatePostResult'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>;
  updateSubscription?: Resolver<ResolversTypes['UpdateSubscriptionResult'], ParentType, ContextType, RequireFields<MutationUpdateSubscriptionArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateUserProfile?: Resolver<ResolversTypes['UpdateUserProfileResult'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
  uploadFileRequest?: Resolver<ResolversTypes['UploadFileRequestResult'], ParentType, ContextType, RequireFields<MutationUploadFileRequestArgs, 'input'>>;
  uploadImportFile?: Resolver<ResolversTypes['UploadImportFileResult'], ParentType, ContextType, RequireFields<MutationUploadImportFileArgs, 'contentType' | 'type'>>;
};

export type NewsletterEmailResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['NewsletterEmail'] = ResolversParentTypes['NewsletterEmail']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  confirmationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscriptionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsletterEmailsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['NewsletterEmailsError'] = ResolversParentTypes['NewsletterEmailsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['NewsletterEmailsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsletterEmailsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['NewsletterEmailsResult'] = ResolversParentTypes['NewsletterEmailsResult']> = {
  __resolveType: TypeResolveFn<'NewsletterEmailsError' | 'NewsletterEmailsSuccess', ParentType, ContextType>;
};

export type NewsletterEmailsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['NewsletterEmailsSuccess'] = ResolversParentTypes['NewsletterEmailsSuccess']> = {
  newsletterEmails?: Resolver<Array<ResolversTypes['NewsletterEmail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptInFeatureErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OptInFeatureError'] = ResolversParentTypes['OptInFeatureError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['OptInFeatureErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptInFeatureResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OptInFeatureResult'] = ResolversParentTypes['OptInFeatureResult']> = {
  __resolveType: TypeResolveFn<'OptInFeatureError' | 'OptInFeatureSuccess', ParentType, ContextType>;
};

export type OptInFeatureSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OptInFeatureSuccess'] = ResolversParentTypes['OptInFeatureSuccess']> = {
  feature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalHtml?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  readableHtml?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PageType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  highlights?: Resolver<Maybe<Array<ResolversTypes['Highlight']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  libraryItems?: Resolver<Maybe<Array<ResolversTypes['Article']>>, ParentType, ContextType>;
  ownedByViewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  thought?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostError'] = ResolversParentTypes['PostError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['PostErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostResult'] = ResolversParentTypes['PostResult']> = {
  __resolveType: TypeResolveFn<'PostError' | 'PostSuccess', ParentType, ContextType>;
};

export type PostSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostSuccess'] = ResolversParentTypes['PostSuccess']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostsError'] = ResolversParentTypes['PostsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['PostsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostsResult'] = ResolversParentTypes['PostsResult']> = {
  __resolveType: TypeResolveFn<'PostsError' | 'PostsSuccess', ParentType, ContextType>;
};

export type PostsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PostsSuccess'] = ResolversParentTypes['PostsSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ankiCardBatches?: Resolver<ResolversTypes['AnkiCardBatchesResult'], ParentType, ContextType, Partial<QueryAnkiCardBatchesArgs>>;
  ankiCards?: Resolver<ResolversTypes['AnkiCardsResult'], ParentType, ContextType, RequireFields<QueryAnkiCardsArgs, 'libraryItemId'>>;
  ankiIntegration?: Resolver<ResolversTypes['AnkiIntegrationResult'], ParentType, ContextType>;
  apiKeys?: Resolver<ResolversTypes['ApiKeysResult'], ParentType, ContextType>;
  article?: Resolver<ResolversTypes['ArticleResult'], ParentType, ContextType, RequireFields<QueryArticleArgs, 'slug' | 'username'>>;
  articleSavingRequest?: Resolver<ResolversTypes['ArticleSavingRequestResult'], ParentType, ContextType, Partial<QueryArticleSavingRequestArgs>>;
  deviceTokens?: Resolver<ResolversTypes['DeviceTokensResult'], ParentType, ContextType>;
  discoverFeeds?: Resolver<ResolversTypes['DiscoverFeedResult'], ParentType, ContextType>;
  discoverTopics?: Resolver<ResolversTypes['GetDiscoverTopicResults'], ParentType, ContextType>;
  feeds?: Resolver<ResolversTypes['FeedsResult'], ParentType, ContextType, RequireFields<QueryFeedsArgs, 'input'>>;
  filters?: Resolver<ResolversTypes['FiltersResult'], ParentType, ContextType>;
  folderPolicies?: Resolver<ResolversTypes['FolderPoliciesResult'], ParentType, ContextType>;
  getDiscoverFeedArticles?: Resolver<ResolversTypes['GetDiscoverFeedArticleResults'], ParentType, ContextType, RequireFields<QueryGetDiscoverFeedArticlesArgs, 'discoverTopicId'>>;
  getUserPersonalization?: Resolver<ResolversTypes['GetUserPersonalizationResult'], ParentType, ContextType>;
  groups?: Resolver<ResolversTypes['GroupsResult'], ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hiddenHomeSection?: Resolver<ResolversTypes['HiddenHomeSectionResult'], ParentType, ContextType>;
  highlights?: Resolver<ResolversTypes['HighlightsResult'], ParentType, ContextType, Partial<QueryHighlightsArgs>>;
  home?: Resolver<ResolversTypes['HomeResult'], ParentType, ContextType, Partial<QueryHomeArgs>>;
  integration?: Resolver<ResolversTypes['IntegrationResult'], ParentType, ContextType, RequireFields<QueryIntegrationArgs, 'name'>>;
  integrations?: Resolver<ResolversTypes['IntegrationsResult'], ParentType, ContextType>;
  labels?: Resolver<ResolversTypes['LabelsResult'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  newsletterEmails?: Resolver<ResolversTypes['NewsletterEmailsResult'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['PostResult'], ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostsResult'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'userId'>>;
  recentEmails?: Resolver<ResolversTypes['RecentEmailsResult'], ParentType, ContextType>;
  recentSearches?: Resolver<ResolversTypes['RecentSearchesResult'], ParentType, ContextType>;
  rules?: Resolver<ResolversTypes['RulesResult'], ParentType, ContextType, Partial<QueryRulesArgs>>;
  scanFeeds?: Resolver<ResolversTypes['ScanFeedsResult'], ParentType, ContextType, RequireFields<QueryScanFeedsArgs, 'input'>>;
  search?: Resolver<ResolversTypes['SearchResult'], ParentType, ContextType, Partial<QuerySearchArgs>>;
  sendInstallInstructions?: Resolver<ResolversTypes['SendInstallInstructionsResult'], ParentType, ContextType>;
  subscription?: Resolver<ResolversTypes['SubscriptionResult'], ParentType, ContextType, RequireFields<QuerySubscriptionArgs, 'id'>>;
  subscriptions?: Resolver<ResolversTypes['SubscriptionsResult'], ParentType, ContextType, Partial<QuerySubscriptionsArgs>>;
  typeaheadSearch?: Resolver<ResolversTypes['TypeaheadSearchResult'], ParentType, ContextType, RequireFields<QueryTypeaheadSearchArgs, 'query'>>;
  updatesSince?: Resolver<ResolversTypes['UpdatesSinceResult'], ParentType, ContextType, RequireFields<QueryUpdatesSinceArgs, 'since'>>;
  user?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, Partial<QueryUserArgs>>;
  users?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType>;
  validateUsername?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryValidateUsernameArgs, 'username'>>;
  webhook?: Resolver<ResolversTypes['WebhookResult'], ParentType, ContextType, RequireFields<QueryWebhookArgs, 'id'>>;
  webhooks?: Resolver<ResolversTypes['WebhooksResult'], ParentType, ContextType>;
};

export type ReactionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  code?: Resolver<ResolversTypes['ReactionType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadStateResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReadState'] = ResolversParentTypes['ReadState']> = {
  progressAnchorIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  progressPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reading?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  readingTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentEmailResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentEmail'] = ResolversParentTypes['RecentEmail']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  html?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reply?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  replyTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentEmailsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentEmailsError'] = ResolversParentTypes['RecentEmailsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RecentEmailsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentEmailsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentEmailsResult'] = ResolversParentTypes['RecentEmailsResult']> = {
  __resolveType: TypeResolveFn<'RecentEmailsError' | 'RecentEmailsSuccess', ParentType, ContextType>;
};

export type RecentEmailsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentEmailsSuccess'] = ResolversParentTypes['RecentEmailsSuccess']> = {
  recentEmails?: Resolver<Array<ResolversTypes['RecentEmail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentSearchResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentSearch'] = ResolversParentTypes['RecentSearch']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  term?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentSearchesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentSearchesError'] = ResolversParentTypes['RecentSearchesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RecentSearchesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentSearchesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentSearchesResult'] = ResolversParentTypes['RecentSearchesResult']> = {
  __resolveType: TypeResolveFn<'RecentSearchesError' | 'RecentSearchesSuccess', ParentType, ContextType>;
};

export type RecentSearchesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecentSearchesSuccess'] = ResolversParentTypes['RecentSearchesSuccess']> = {
  searches?: Resolver<Array<ResolversTypes['RecentSearch']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendError'] = ResolversParentTypes['RecommendError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RecommendErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendHighlightsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendHighlightsError'] = ResolversParentTypes['RecommendHighlightsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RecommendHighlightsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendHighlightsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendHighlightsResult'] = ResolversParentTypes['RecommendHighlightsResult']> = {
  __resolveType: TypeResolveFn<'RecommendHighlightsError' | 'RecommendHighlightsSuccess', ParentType, ContextType>;
};

export type RecommendHighlightsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendHighlightsSuccess'] = ResolversParentTypes['RecommendHighlightsSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendResult'] = ResolversParentTypes['RecommendResult']> = {
  __resolveType: TypeResolveFn<'RecommendError' | 'RecommendSuccess', ParentType, ContextType>;
};

export type RecommendSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendSuccess'] = ResolversParentTypes['RecommendSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Recommendation'] = ResolversParentTypes['Recommendation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recommendedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['RecommendingUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendationGroupResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendationGroup'] = ResolversParentTypes['RecommendationGroup']> = {
  admins?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  canPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canSeeMembers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inviteUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendingUserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RecommendingUser'] = ResolversParentTypes['RecommendingUser']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshHomeErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RefreshHomeError'] = ResolversParentTypes['RefreshHomeError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RefreshHomeErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshHomeResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RefreshHomeResult'] = ResolversParentTypes['RefreshHomeResult']> = {
  __resolveType: TypeResolveFn<'RefreshHomeError' | 'RefreshHomeSuccess', ParentType, ContextType>;
};

export type RefreshHomeSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RefreshHomeSuccess'] = ResolversParentTypes['RefreshHomeSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegenerateAnkiCardsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RegenerateAnkiCardsError'] = ResolversParentTypes['RegenerateAnkiCardsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RegenerateAnkiCardsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegenerateAnkiCardsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RegenerateAnkiCardsResult'] = ResolversParentTypes['RegenerateAnkiCardsResult']> = {
  __resolveType: TypeResolveFn<'RegenerateAnkiCardsError' | 'RegenerateAnkiCardsSuccess', ParentType, ContextType>;
};

export type RegenerateAnkiCardsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RegenerateAnkiCardsSuccess'] = ResolversParentTypes['RegenerateAnkiCardsSuccess']> = {
  batch?: Resolver<ResolversTypes['AnkiCardBatch'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']> = {
  archiveUntil?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  remindAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  sendNotification?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReminderError'] = ResolversParentTypes['ReminderError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ReminderErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReminderResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReminderResult'] = ResolversParentTypes['ReminderResult']> = {
  __resolveType: TypeResolveFn<'ReminderError' | 'ReminderSuccess', ParentType, ContextType>;
};

export type ReminderSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReminderSuccess'] = ResolversParentTypes['ReminderSuccess']> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyToEmailErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReplyToEmailError'] = ResolversParentTypes['ReplyToEmailError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ReplyToEmailErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyToEmailResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReplyToEmailResult'] = ResolversParentTypes['ReplyToEmailResult']> = {
  __resolveType: TypeResolveFn<'ReplyToEmailError' | 'ReplyToEmailSuccess', ParentType, ContextType>;
};

export type ReplyToEmailSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReplyToEmailSuccess'] = ResolversParentTypes['ReplyToEmailSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportItemResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ReportItemResult'] = ResolversParentTypes['ReportItemResult']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevokeApiKeyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RevokeApiKeyError'] = ResolversParentTypes['RevokeApiKeyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RevokeApiKeyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevokeApiKeyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RevokeApiKeyResult'] = ResolversParentTypes['RevokeApiKeyResult']> = {
  __resolveType: TypeResolveFn<'RevokeApiKeyError' | 'RevokeApiKeySuccess', ParentType, ContextType>;
};

export type RevokeApiKeySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RevokeApiKeySuccess'] = ResolversParentTypes['RevokeApiKeySuccess']> = {
  apiKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Rule'] = ResolversParentTypes['Rule']> = {
  actions?: Resolver<Array<ResolversTypes['RuleAction']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  eventTypes?: Resolver<Array<ResolversTypes['RuleEventType']>, ParentType, ContextType>;
  failedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  filter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleActionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RuleAction'] = ResolversParentTypes['RuleAction']> = {
  params?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RuleActionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RulesErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RulesError'] = ResolversParentTypes['RulesError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['RulesErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RulesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RulesResult'] = ResolversParentTypes['RulesResult']> = {
  __resolveType: TypeResolveFn<'RulesError' | 'RulesSuccess', ParentType, ContextType>;
};

export type RulesSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RulesSuccess'] = ResolversParentTypes['RulesSuccess']> = {
  rules?: Resolver<Array<ResolversTypes['Rule']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveArticleReadingProgressErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveArticleReadingProgressError'] = ResolversParentTypes['SaveArticleReadingProgressError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SaveArticleReadingProgressErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveArticleReadingProgressResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveArticleReadingProgressResult'] = ResolversParentTypes['SaveArticleReadingProgressResult']> = {
  __resolveType: TypeResolveFn<'SaveArticleReadingProgressError' | 'SaveArticleReadingProgressSuccess', ParentType, ContextType>;
};

export type SaveArticleReadingProgressSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveArticleReadingProgressSuccess'] = ResolversParentTypes['SaveArticleReadingProgressSuccess']> = {
  updatedArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveDiscoverArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveDiscoverArticleError'] = ResolversParentTypes['SaveDiscoverArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SaveDiscoverArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveDiscoverArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveDiscoverArticleResult'] = ResolversParentTypes['SaveDiscoverArticleResult']> = {
  __resolveType: TypeResolveFn<'SaveDiscoverArticleError' | 'SaveDiscoverArticleSuccess', ParentType, ContextType>;
};

export type SaveDiscoverArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveDiscoverArticleSuccess'] = ResolversParentTypes['SaveDiscoverArticleSuccess']> = {
  saveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveError'] = ResolversParentTypes['SaveError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SaveErrorCode']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveFilterErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveFilterError'] = ResolversParentTypes['SaveFilterError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SaveFilterErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveFilterResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveFilterResult'] = ResolversParentTypes['SaveFilterResult']> = {
  __resolveType: TypeResolveFn<'SaveFilterError' | 'SaveFilterSuccess', ParentType, ContextType>;
};

export type SaveFilterSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveFilterSuccess'] = ResolversParentTypes['SaveFilterSuccess']> = {
  filter?: Resolver<ResolversTypes['Filter'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveResult'] = ResolversParentTypes['SaveResult']> = {
  __resolveType: TypeResolveFn<'SaveError' | 'SaveSuccess', ParentType, ContextType>;
};

export type SaveSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SaveSuccess'] = ResolversParentTypes['SaveSuccess']> = {
  clientRequestId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScanFeedsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ScanFeedsError'] = ResolversParentTypes['ScanFeedsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ScanFeedsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScanFeedsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ScanFeedsResult'] = ResolversParentTypes['ScanFeedsResult']> = {
  __resolveType: TypeResolveFn<'ScanFeedsError' | 'ScanFeedsSuccess', ParentType, ContextType>;
};

export type ScanFeedsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ScanFeedsSuccess'] = ResolversParentTypes['ScanFeedsSuccess']> = {
  feeds?: Resolver<Array<ResolversTypes['Feed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchError'] = ResolversParentTypes['SearchError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SearchErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchItem'] = ResolversParentTypes['SearchItem']> = {
  aiSummary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ankiCardCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  annotation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  archivedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentReader?: Resolver<ResolversTypes['ContentReader'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directionality?: Resolver<Maybe<ResolversTypes['DirectionalityType']>, ParentType, ContextType>;
  feedContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  highlights?: Resolver<Maybe<Array<ResolversTypes['Highlight']>>, ParentType, ContextType>;
  highlightsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['Label']>>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  originalArticleUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownedByViewer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  pageType?: Resolver<ResolversTypes['PageType'], ParentType, ContextType>;
  previewContentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  quote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  readAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  readingProgressAnchorIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  readingProgressPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  readingProgressTopPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<Array<ResolversTypes['Recommendation']>>, ParentType, ContextType>;
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seenAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shortId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siteIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['ArticleSavingRequestStatus']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translatedLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubHttpUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubMailTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wordsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchItemEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchItemEdge'] = ResolversParentTypes['SearchItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SearchItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'SearchError' | 'SearchSuccess', ParentType, ContextType>;
};

export type SearchSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchSuccess'] = ResolversParentTypes['SearchSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['SearchItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendInstallInstructionsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SendInstallInstructionsError'] = ResolversParentTypes['SendInstallInstructionsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SendInstallInstructionsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendInstallInstructionsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SendInstallInstructionsResult'] = ResolversParentTypes['SendInstallInstructionsResult']> = {
  __resolveType: TypeResolveFn<'SendInstallInstructionsError' | 'SendInstallInstructionsSuccess', ParentType, ContextType>;
};

export type SendInstallInstructionsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SendInstallInstructionsSuccess'] = ResolversParentTypes['SendInstallInstructionsSuccess']> = {
  sent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetBookmarkArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetBookmarkArticleError'] = ResolversParentTypes['SetBookmarkArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetBookmarkArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetBookmarkArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetBookmarkArticleResult'] = ResolversParentTypes['SetBookmarkArticleResult']> = {
  __resolveType: TypeResolveFn<'SetBookmarkArticleError' | 'SetBookmarkArticleSuccess', ParentType, ContextType>;
};

export type SetBookmarkArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetBookmarkArticleSuccess'] = ResolversParentTypes['SetBookmarkArticleSuccess']> = {
  bookmarkedArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetDeviceTokenErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetDeviceTokenError'] = ResolversParentTypes['SetDeviceTokenError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetDeviceTokenErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetDeviceTokenResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetDeviceTokenResult'] = ResolversParentTypes['SetDeviceTokenResult']> = {
  __resolveType: TypeResolveFn<'SetDeviceTokenError' | 'SetDeviceTokenSuccess', ParentType, ContextType>;
};

export type SetDeviceTokenSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetDeviceTokenSuccess'] = ResolversParentTypes['SetDeviceTokenSuccess']> = {
  deviceToken?: Resolver<ResolversTypes['DeviceToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetFavoriteArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFavoriteArticleError'] = ResolversParentTypes['SetFavoriteArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetFavoriteArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetFavoriteArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFavoriteArticleResult'] = ResolversParentTypes['SetFavoriteArticleResult']> = {
  __resolveType: TypeResolveFn<'SetFavoriteArticleError' | 'SetFavoriteArticleSuccess', ParentType, ContextType>;
};

export type SetFavoriteArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFavoriteArticleSuccess'] = ResolversParentTypes['SetFavoriteArticleSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetFollowErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFollowError'] = ResolversParentTypes['SetFollowError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetFollowErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetFollowResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFollowResult'] = ResolversParentTypes['SetFollowResult']> = {
  __resolveType: TypeResolveFn<'SetFollowError' | 'SetFollowSuccess', ParentType, ContextType>;
};

export type SetFollowSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetFollowSuccess'] = ResolversParentTypes['SetFollowSuccess']> = {
  updatedUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetIntegrationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetIntegrationError'] = ResolversParentTypes['SetIntegrationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetIntegrationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetIntegrationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetIntegrationResult'] = ResolversParentTypes['SetIntegrationResult']> = {
  __resolveType: TypeResolveFn<'SetIntegrationError' | 'SetIntegrationSuccess', ParentType, ContextType>;
};

export type SetIntegrationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetIntegrationSuccess'] = ResolversParentTypes['SetIntegrationSuccess']> = {
  integration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetLabelsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetLabelsError'] = ResolversParentTypes['SetLabelsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetLabelsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetLabelsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetLabelsResult'] = ResolversParentTypes['SetLabelsResult']> = {
  __resolveType: TypeResolveFn<'SetLabelsError' | 'SetLabelsSuccess', ParentType, ContextType>;
};

export type SetLabelsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetLabelsSuccess'] = ResolversParentTypes['SetLabelsSuccess']> = {
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetRuleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetRuleError'] = ResolversParentTypes['SetRuleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetRuleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetRuleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetRuleResult'] = ResolversParentTypes['SetRuleResult']> = {
  __resolveType: TypeResolveFn<'SetRuleError' | 'SetRuleSuccess', ParentType, ContextType>;
};

export type SetRuleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetRuleSuccess'] = ResolversParentTypes['SetRuleSuccess']> = {
  rule?: Resolver<ResolversTypes['Rule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShareArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareArticleError'] = ResolversParentTypes['SetShareArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetShareArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShareArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareArticleResult'] = ResolversParentTypes['SetShareArticleResult']> = {
  __resolveType: TypeResolveFn<'SetShareArticleError' | 'SetShareArticleSuccess', ParentType, ContextType>;
};

export type SetShareArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareArticleSuccess'] = ResolversParentTypes['SetShareArticleSuccess']> = {
  updatedArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  updatedFeedArticle?: Resolver<Maybe<ResolversTypes['FeedArticle']>, ParentType, ContextType>;
  updatedFeedArticleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShareHighlightErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareHighlightError'] = ResolversParentTypes['SetShareHighlightError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetShareHighlightErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShareHighlightResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareHighlightResult'] = ResolversParentTypes['SetShareHighlightResult']> = {
  __resolveType: TypeResolveFn<'SetShareHighlightError' | 'SetShareHighlightSuccess', ParentType, ContextType>;
};

export type SetShareHighlightSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShareHighlightSuccess'] = ResolversParentTypes['SetShareHighlightSuccess']> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShowTranslatedErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShowTranslatedError'] = ResolversParentTypes['SetShowTranslatedError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetShowTranslatedErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetShowTranslatedResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShowTranslatedResult'] = ResolversParentTypes['SetShowTranslatedResult']> = {
  __resolveType: TypeResolveFn<'SetShowTranslatedError' | 'SetShowTranslatedSuccess', ParentType, ContextType>;
};

export type SetShowTranslatedSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetShowTranslatedSuccess'] = ResolversParentTypes['SetShowTranslatedSuccess']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetUserPersonalizationErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetUserPersonalizationError'] = ResolversParentTypes['SetUserPersonalizationError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetUserPersonalizationErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetUserPersonalizationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetUserPersonalizationResult'] = ResolversParentTypes['SetUserPersonalizationResult']> = {
  __resolveType: TypeResolveFn<'SetUserPersonalizationError' | 'SetUserPersonalizationSuccess', ParentType, ContextType>;
};

export type SetUserPersonalizationSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetUserPersonalizationSuccess'] = ResolversParentTypes['SetUserPersonalizationSuccess']> = {
  updatedUserPersonalization?: Resolver<ResolversTypes['UserPersonalization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetWebhookErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetWebhookError'] = ResolversParentTypes['SetWebhookError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SetWebhookErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetWebhookResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetWebhookResult'] = ResolversParentTypes['SetWebhookResult']> = {
  __resolveType: TypeResolveFn<'SetWebhookError' | 'SetWebhookSuccess', ParentType, ContextType>;
};

export type SetWebhookSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SetWebhookSuccess'] = ResolversParentTypes['SetWebhookSuccess']> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShareStatsResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ShareStats'] = ResolversParentTypes['ShareStats']> = {
  readDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  saveCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SharedArticleErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SharedArticleError'] = ResolversParentTypes['SharedArticleError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SharedArticleErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SharedArticleResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SharedArticleResult'] = ResolversParentTypes['SharedArticleResult']> = {
  __resolveType: TypeResolveFn<'SharedArticleError' | 'SharedArticleSuccess', ParentType, ContextType>;
};

export type SharedArticleSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SharedArticleSuccess'] = ResolversParentTypes['SharedArticleSuccess']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscribeErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscribeError'] = ResolversParentTypes['SubscribeError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SubscribeErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscribeResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscribeResult'] = ResolversParentTypes['SubscribeResult']> = {
  __resolveType: TypeResolveFn<'SubscribeError' | 'SubscribeSuccess', ParentType, ContextType>;
};

export type SubscribeSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscribeSuccess'] = ResolversParentTypes['SubscribeSuccess']> = {
  subscriptions?: Resolver<Array<ResolversTypes['Subscription']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  autoAddToLibrary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  failedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fetchContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fetchContentType?: Resolver<ResolversTypes['FetchContentType'], ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastFetchedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  mostRecentItemDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newsletterEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SubscriptionStatus'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SubscriptionType'], ParentType, ContextType>;
  unsubscribeHttpUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubscribeMailTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionError'] = ResolversParentTypes['SubscriptionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['ErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionResult'] = ResolversParentTypes['SubscriptionResult']> = {
  __resolveType: TypeResolveFn<'SubscriptionError' | 'SubscriptionSuccess', ParentType, ContextType>;
};

export type SubscriptionRootTypeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionRootType'] = ResolversParentTypes['SubscriptionRootType']> = {
  hello?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "hello", ParentType, ContextType>;
};

export type SubscriptionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionSuccess'] = ResolversParentTypes['SubscriptionSuccess']> = {
  subscription?: Resolver<ResolversTypes['Subscription'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionsErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionsError'] = ResolversParentTypes['SubscriptionsError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['SubscriptionsErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionsResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionsResult'] = ResolversParentTypes['SubscriptionsResult']> = {
  __resolveType: TypeResolveFn<'SubscriptionsError' | 'SubscriptionsSuccess', ParentType, ContextType>;
};

export type SubscriptionsSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SubscriptionsSuccess'] = ResolversParentTypes['SubscriptionsSuccess']> = {
  subscriptions?: Resolver<Array<ResolversTypes['Subscription']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SyncUpdatedItemEdgeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SyncUpdatedItemEdge'] = ResolversParentTypes['SyncUpdatedItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SearchItem']>, ParentType, ContextType>;
  updateReason?: Resolver<ResolversTypes['UpdateReason'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  cancellable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  failedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  runningTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['TaskState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestAnkiConnectionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TestAnkiConnectionError'] = ResolversParentTypes['TestAnkiConnectionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['TestAnkiConnectionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestAnkiConnectionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TestAnkiConnectionResult'] = ResolversParentTypes['TestAnkiConnectionResult']> = {
  __resolveType: TypeResolveFn<'TestAnkiConnectionError' | 'TestAnkiConnectionSuccess', ParentType, ContextType>;
};

export type TestAnkiConnectionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TestAnkiConnectionSuccess'] = ResolversParentTypes['TestAnkiConnectionSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeaheadSearchErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TypeaheadSearchError'] = ResolversParentTypes['TypeaheadSearchError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['TypeaheadSearchErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeaheadSearchItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TypeaheadSearchItem'] = ResolversParentTypes['TypeaheadSearchItem']> = {
  contentReader?: Resolver<ResolversTypes['ContentReader'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeaheadSearchResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TypeaheadSearchResult'] = ResolversParentTypes['TypeaheadSearchResult']> = {
  __resolveType: TypeResolveFn<'TypeaheadSearchError' | 'TypeaheadSearchSuccess', ParentType, ContextType>;
};

export type TypeaheadSearchSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['TypeaheadSearchSuccess'] = ResolversParentTypes['TypeaheadSearchSuccess']> = {
  items?: Resolver<Array<ResolversTypes['TypeaheadSearchItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsubscribeErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnsubscribeError'] = ResolversParentTypes['UnsubscribeError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UnsubscribeErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsubscribeResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnsubscribeResult'] = ResolversParentTypes['UnsubscribeResult']> = {
  __resolveType: TypeResolveFn<'UnsubscribeError' | 'UnsubscribeSuccess', ParentType, ContextType>;
};

export type UnsubscribeSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnsubscribeSuccess'] = ResolversParentTypes['UnsubscribeSuccess']> = {
  subscription?: Resolver<ResolversTypes['Subscription'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateEmailErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateEmailError'] = ResolversParentTypes['UpdateEmailError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateEmailErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateEmailResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateEmailResult'] = ResolversParentTypes['UpdateEmailResult']> = {
  __resolveType: TypeResolveFn<'UpdateEmailError' | 'UpdateEmailSuccess', ParentType, ContextType>;
};

export type UpdateEmailSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateEmailSuccess'] = ResolversParentTypes['UpdateEmailSuccess']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationEmailSent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFilterErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFilterError'] = ResolversParentTypes['UpdateFilterError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateFilterErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFilterResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFilterResult'] = ResolversParentTypes['UpdateFilterResult']> = {
  __resolveType: TypeResolveFn<'UpdateFilterError' | 'UpdateFilterSuccess', ParentType, ContextType>;
};

export type UpdateFilterSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFilterSuccess'] = ResolversParentTypes['UpdateFilterSuccess']> = {
  filter?: Resolver<ResolversTypes['Filter'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFolderPolicyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFolderPolicyError'] = ResolversParentTypes['UpdateFolderPolicyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateFolderPolicyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFolderPolicyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFolderPolicyResult'] = ResolversParentTypes['UpdateFolderPolicyResult']> = {
  __resolveType: TypeResolveFn<'UpdateFolderPolicyError' | 'UpdateFolderPolicySuccess', ParentType, ContextType>;
};

export type UpdateFolderPolicySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateFolderPolicySuccess'] = ResolversParentTypes['UpdateFolderPolicySuccess']> = {
  policy?: Resolver<ResolversTypes['FolderPolicy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateHighlightErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightError'] = ResolversParentTypes['UpdateHighlightError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateHighlightErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateHighlightReplyErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightReplyError'] = ResolversParentTypes['UpdateHighlightReplyError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateHighlightReplyErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateHighlightReplyResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightReplyResult'] = ResolversParentTypes['UpdateHighlightReplyResult']> = {
  __resolveType: TypeResolveFn<'UpdateHighlightReplyError' | 'UpdateHighlightReplySuccess', ParentType, ContextType>;
};

export type UpdateHighlightReplySuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightReplySuccess'] = ResolversParentTypes['UpdateHighlightReplySuccess']> = {
  highlightReply?: Resolver<ResolversTypes['HighlightReply'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateHighlightResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightResult'] = ResolversParentTypes['UpdateHighlightResult']> = {
  __resolveType: TypeResolveFn<'UpdateHighlightError' | 'UpdateHighlightSuccess', ParentType, ContextType>;
};

export type UpdateHighlightSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateHighlightSuccess'] = ResolversParentTypes['UpdateHighlightSuccess']> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLabelErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLabelError'] = ResolversParentTypes['UpdateLabelError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateLabelErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLabelResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLabelResult'] = ResolversParentTypes['UpdateLabelResult']> = {
  __resolveType: TypeResolveFn<'UpdateLabelError' | 'UpdateLabelSuccess', ParentType, ContextType>;
};

export type UpdateLabelSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLabelSuccess'] = ResolversParentTypes['UpdateLabelSuccess']> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLinkShareInfoErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLinkShareInfoError'] = ResolversParentTypes['UpdateLinkShareInfoError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateLinkShareInfoErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLinkShareInfoResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLinkShareInfoResult'] = ResolversParentTypes['UpdateLinkShareInfoResult']> = {
  __resolveType: TypeResolveFn<'UpdateLinkShareInfoError' | 'UpdateLinkShareInfoSuccess', ParentType, ContextType>;
};

export type UpdateLinkShareInfoSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateLinkShareInfoSuccess'] = ResolversParentTypes['UpdateLinkShareInfoSuccess']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateNewsletterEmailErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateNewsletterEmailError'] = ResolversParentTypes['UpdateNewsletterEmailError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateNewsletterEmailErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateNewsletterEmailResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateNewsletterEmailResult'] = ResolversParentTypes['UpdateNewsletterEmailResult']> = {
  __resolveType: TypeResolveFn<'UpdateNewsletterEmailError' | 'UpdateNewsletterEmailSuccess', ParentType, ContextType>;
};

export type UpdateNewsletterEmailSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateNewsletterEmailSuccess'] = ResolversParentTypes['UpdateNewsletterEmailSuccess']> = {
  newsletterEmail?: Resolver<ResolversTypes['NewsletterEmail'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePageErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePageError'] = ResolversParentTypes['UpdatePageError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdatePageErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePageResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePageResult'] = ResolversParentTypes['UpdatePageResult']> = {
  __resolveType: TypeResolveFn<'UpdatePageError' | 'UpdatePageSuccess', ParentType, ContextType>;
};

export type UpdatePageSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePageSuccess'] = ResolversParentTypes['UpdatePageSuccess']> = {
  updatedPage?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePostError'] = ResolversParentTypes['UpdatePostError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdatePostErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePostResult'] = ResolversParentTypes['UpdatePostResult']> = {
  __resolveType: TypeResolveFn<'UpdatePostError' | 'UpdatePostSuccess', ParentType, ContextType>;
};

export type UpdatePostSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatePostSuccess'] = ResolversParentTypes['UpdatePostSuccess']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateReminderErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateReminderError'] = ResolversParentTypes['UpdateReminderError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateReminderErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateReminderResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateReminderResult'] = ResolversParentTypes['UpdateReminderResult']> = {
  __resolveType: TypeResolveFn<'UpdateReminderError' | 'UpdateReminderSuccess', ParentType, ContextType>;
};

export type UpdateReminderSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateReminderSuccess'] = ResolversParentTypes['UpdateReminderSuccess']> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSharedCommentErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSharedCommentError'] = ResolversParentTypes['UpdateSharedCommentError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateSharedCommentErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSharedCommentResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSharedCommentResult'] = ResolversParentTypes['UpdateSharedCommentResult']> = {
  __resolveType: TypeResolveFn<'UpdateSharedCommentError' | 'UpdateSharedCommentSuccess', ParentType, ContextType>;
};

export type UpdateSharedCommentSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSharedCommentSuccess'] = ResolversParentTypes['UpdateSharedCommentSuccess']> = {
  articleID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sharedComment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSubscriptionErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSubscriptionError'] = ResolversParentTypes['UpdateSubscriptionError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateSubscriptionErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSubscriptionResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSubscriptionResult'] = ResolversParentTypes['UpdateSubscriptionResult']> = {
  __resolveType: TypeResolveFn<'UpdateSubscriptionError' | 'UpdateSubscriptionSuccess', ParentType, ContextType>;
};

export type UpdateSubscriptionSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateSubscriptionSuccess'] = ResolversParentTypes['UpdateSubscriptionSuccess']> = {
  subscription?: Resolver<ResolversTypes['Subscription'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserError'] = ResolversParentTypes['UpdateUserError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateUserErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserProfileErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserProfileError'] = ResolversParentTypes['UpdateUserProfileError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdateUserProfileErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserProfileResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserProfileResult'] = ResolversParentTypes['UpdateUserProfileResult']> = {
  __resolveType: TypeResolveFn<'UpdateUserProfileError' | 'UpdateUserProfileSuccess', ParentType, ContextType>;
};

export type UpdateUserProfileSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserProfileSuccess'] = ResolversParentTypes['UpdateUserProfileSuccess']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserResult'] = ResolversParentTypes['UpdateUserResult']> = {
  __resolveType: TypeResolveFn<'UpdateUserError' | 'UpdateUserSuccess', ParentType, ContextType>;
};

export type UpdateUserSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdateUserSuccess'] = ResolversParentTypes['UpdateUserSuccess']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatesSinceErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatesSinceError'] = ResolversParentTypes['UpdatesSinceError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UpdatesSinceErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatesSinceResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatesSinceResult'] = ResolversParentTypes['UpdatesSinceResult']> = {
  __resolveType: TypeResolveFn<'UpdatesSinceError' | 'UpdatesSinceSuccess', ParentType, ContextType>;
};

export type UpdatesSinceSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UpdatesSinceSuccess'] = ResolversParentTypes['UpdatesSinceSuccess']> = {
  edges?: Resolver<Array<ResolversTypes['SyncUpdatedItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadFileRequestErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadFileRequestError'] = ResolversParentTypes['UploadFileRequestError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UploadFileRequestErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadFileRequestResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadFileRequestResult'] = ResolversParentTypes['UploadFileRequestResult']> = {
  __resolveType: TypeResolveFn<'UploadFileRequestError' | 'UploadFileRequestSuccess', ParentType, ContextType>;
};

export type UploadFileRequestSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadFileRequestSuccess'] = ResolversParentTypes['UploadFileRequestSuccess']> = {
  createdPageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  uploadSignedUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadImportFileErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadImportFileError'] = ResolversParentTypes['UploadImportFileError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UploadImportFileErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadImportFileResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadImportFileResult'] = ResolversParentTypes['UploadImportFileResult']> = {
  __resolveType: TypeResolveFn<'UploadImportFileError' | 'UploadImportFileSuccess', ParentType, ContextType>;
};

export type UploadImportFileSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UploadImportFileSuccess'] = ResolversParentTypes['UploadImportFileSuccess']> = {
  uploadSignedUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featureList?: Resolver<Maybe<Array<ResolversTypes['Feature']>>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  followersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  friendsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  intercomHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFriend?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isFullUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  sharedArticles?: Resolver<Array<ResolversTypes['FeedArticle']>, ParentType, ContextType>;
  sharedArticlesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sharedHighlightsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sharedNotesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewerIsFollowing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UserErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPersonalizationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UserPersonalization'] = ResolversParentTypes['UserPersonalization']> = {
  autoTranslate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  digestConfig?: Resolver<Maybe<ResolversTypes['DigestConfig']>, ParentType, ContextType>;
  fields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fontFamily?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  libraryLayoutType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  librarySortOrder?: Resolver<Maybe<ResolversTypes['SortOrder']>, ParentType, ContextType>;
  margin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  preferredLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speechRate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speechSecondaryVoice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speechVoice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speechVolume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'UserError' | 'UserSuccess', ParentType, ContextType>;
};

export type UserSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UserSuccess'] = ResolversParentTypes['UserSuccess']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UsersError'] = ResolversParentTypes['UsersError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['UsersErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = {
  __resolveType: TypeResolveFn<'UsersError' | 'UsersSuccess', ParentType, ContextType>;
};

export type UsersSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UsersSuccess'] = ResolversParentTypes['UsersSuccess']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  eventTypes?: Resolver<Array<ResolversTypes['WebhookEvent']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhookError'] = ResolversParentTypes['WebhookError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['WebhookErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhookResult'] = ResolversParentTypes['WebhookResult']> = {
  __resolveType: TypeResolveFn<'WebhookError' | 'WebhookSuccess', ParentType, ContextType>;
};

export type WebhookSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhookSuccess'] = ResolversParentTypes['WebhookSuccess']> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhooksErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhooksError'] = ResolversParentTypes['WebhooksError']> = {
  errorCodes?: Resolver<Array<ResolversTypes['WebhooksErrorCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhooksResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhooksResult'] = ResolversParentTypes['WebhooksResult']> = {
  __resolveType: TypeResolveFn<'WebhooksError' | 'WebhooksSuccess', ParentType, ContextType>;
};

export type WebhooksSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['WebhooksSuccess'] = ResolversParentTypes['WebhooksSuccess']> = {
  webhooks?: Resolver<Array<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  AddDiscoverFeedError?: AddDiscoverFeedErrorResolvers<ContextType>;
  AddDiscoverFeedResult?: AddDiscoverFeedResultResolvers<ContextType>;
  AddDiscoverFeedSuccess?: AddDiscoverFeedSuccessResolvers<ContextType>;
  AddPopularReadError?: AddPopularReadErrorResolvers<ContextType>;
  AddPopularReadResult?: AddPopularReadResultResolvers<ContextType>;
  AddPopularReadSuccess?: AddPopularReadSuccessResolvers<ContextType>;
  AnkiCardBatch?: AnkiCardBatchResolvers<ContextType>;
  AnkiCardBatchesError?: AnkiCardBatchesErrorResolvers<ContextType>;
  AnkiCardBatchesResult?: AnkiCardBatchesResultResolvers<ContextType>;
  AnkiCardBatchesSuccess?: AnkiCardBatchesSuccessResolvers<ContextType>;
  AnkiCardDetail?: AnkiCardDetailResolvers<ContextType>;
  AnkiCardsError?: AnkiCardsErrorResolvers<ContextType>;
  AnkiCardsResult?: AnkiCardsResultResolvers<ContextType>;
  AnkiCardsSuccess?: AnkiCardsSuccessResolvers<ContextType>;
  AnkiIntegrationError?: AnkiIntegrationErrorResolvers<ContextType>;
  AnkiIntegrationResult?: AnkiIntegrationResultResolvers<ContextType>;
  AnkiIntegrationSuccess?: AnkiIntegrationSuccessResolvers<ContextType>;
  ApiKey?: ApiKeyResolvers<ContextType>;
  ApiKeysError?: ApiKeysErrorResolvers<ContextType>;
  ApiKeysResult?: ApiKeysResultResolvers<ContextType>;
  ApiKeysSuccess?: ApiKeysSuccessResolvers<ContextType>;
  ArchiveLinkError?: ArchiveLinkErrorResolvers<ContextType>;
  ArchiveLinkResult?: ArchiveLinkResultResolvers<ContextType>;
  ArchiveLinkSuccess?: ArchiveLinkSuccessResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleEdge?: ArticleEdgeResolvers<ContextType>;
  ArticleError?: ArticleErrorResolvers<ContextType>;
  ArticleResult?: ArticleResultResolvers<ContextType>;
  ArticleSavingRequest?: ArticleSavingRequestResolvers<ContextType>;
  ArticleSavingRequestError?: ArticleSavingRequestErrorResolvers<ContextType>;
  ArticleSavingRequestResult?: ArticleSavingRequestResultResolvers<ContextType>;
  ArticleSavingRequestSuccess?: ArticleSavingRequestSuccessResolvers<ContextType>;
  ArticleSuccess?: ArticleSuccessResolvers<ContextType>;
  ArticlesError?: ArticlesErrorResolvers<ContextType>;
  ArticlesResult?: ArticlesResultResolvers<ContextType>;
  ArticlesSuccess?: ArticlesSuccessResolvers<ContextType>;
  BulkActionError?: BulkActionErrorResolvers<ContextType>;
  BulkActionResult?: BulkActionResultResolvers<ContextType>;
  BulkActionSuccess?: BulkActionSuccessResolvers<ContextType>;
  CreateArticleError?: CreateArticleErrorResolvers<ContextType>;
  CreateArticleResult?: CreateArticleResultResolvers<ContextType>;
  CreateArticleSavingRequestError?: CreateArticleSavingRequestErrorResolvers<ContextType>;
  CreateArticleSavingRequestResult?: CreateArticleSavingRequestResultResolvers<ContextType>;
  CreateArticleSavingRequestSuccess?: CreateArticleSavingRequestSuccessResolvers<ContextType>;
  CreateArticleSuccess?: CreateArticleSuccessResolvers<ContextType>;
  CreateFolderPolicyError?: CreateFolderPolicyErrorResolvers<ContextType>;
  CreateFolderPolicyResult?: CreateFolderPolicyResultResolvers<ContextType>;
  CreateFolderPolicySuccess?: CreateFolderPolicySuccessResolvers<ContextType>;
  CreateGroupError?: CreateGroupErrorResolvers<ContextType>;
  CreateGroupResult?: CreateGroupResultResolvers<ContextType>;
  CreateGroupSuccess?: CreateGroupSuccessResolvers<ContextType>;
  CreateHighlightError?: CreateHighlightErrorResolvers<ContextType>;
  CreateHighlightReplyError?: CreateHighlightReplyErrorResolvers<ContextType>;
  CreateHighlightReplyResult?: CreateHighlightReplyResultResolvers<ContextType>;
  CreateHighlightReplySuccess?: CreateHighlightReplySuccessResolvers<ContextType>;
  CreateHighlightResult?: CreateHighlightResultResolvers<ContextType>;
  CreateHighlightSuccess?: CreateHighlightSuccessResolvers<ContextType>;
  CreateLabelError?: CreateLabelErrorResolvers<ContextType>;
  CreateLabelResult?: CreateLabelResultResolvers<ContextType>;
  CreateLabelSuccess?: CreateLabelSuccessResolvers<ContextType>;
  CreateNewsletterEmailError?: CreateNewsletterEmailErrorResolvers<ContextType>;
  CreateNewsletterEmailResult?: CreateNewsletterEmailResultResolvers<ContextType>;
  CreateNewsletterEmailSuccess?: CreateNewsletterEmailSuccessResolvers<ContextType>;
  CreatePostError?: CreatePostErrorResolvers<ContextType>;
  CreatePostResult?: CreatePostResultResolvers<ContextType>;
  CreatePostSuccess?: CreatePostSuccessResolvers<ContextType>;
  CreateReactionError?: CreateReactionErrorResolvers<ContextType>;
  CreateReactionResult?: CreateReactionResultResolvers<ContextType>;
  CreateReactionSuccess?: CreateReactionSuccessResolvers<ContextType>;
  CreateReminderError?: CreateReminderErrorResolvers<ContextType>;
  CreateReminderResult?: CreateReminderResultResolvers<ContextType>;
  CreateReminderSuccess?: CreateReminderSuccessResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteAccountError?: DeleteAccountErrorResolvers<ContextType>;
  DeleteAccountResult?: DeleteAccountResultResolvers<ContextType>;
  DeleteAccountSuccess?: DeleteAccountSuccessResolvers<ContextType>;
  DeleteDiscoverArticleError?: DeleteDiscoverArticleErrorResolvers<ContextType>;
  DeleteDiscoverArticleResult?: DeleteDiscoverArticleResultResolvers<ContextType>;
  DeleteDiscoverArticleSuccess?: DeleteDiscoverArticleSuccessResolvers<ContextType>;
  DeleteDiscoverFeedError?: DeleteDiscoverFeedErrorResolvers<ContextType>;
  DeleteDiscoverFeedResult?: DeleteDiscoverFeedResultResolvers<ContextType>;
  DeleteDiscoverFeedSuccess?: DeleteDiscoverFeedSuccessResolvers<ContextType>;
  DeleteFilterError?: DeleteFilterErrorResolvers<ContextType>;
  DeleteFilterResult?: DeleteFilterResultResolvers<ContextType>;
  DeleteFilterSuccess?: DeleteFilterSuccessResolvers<ContextType>;
  DeleteFolderPolicyError?: DeleteFolderPolicyErrorResolvers<ContextType>;
  DeleteFolderPolicyResult?: DeleteFolderPolicyResultResolvers<ContextType>;
  DeleteFolderPolicySuccess?: DeleteFolderPolicySuccessResolvers<ContextType>;
  DeleteHighlightError?: DeleteHighlightErrorResolvers<ContextType>;
  DeleteHighlightReplyError?: DeleteHighlightReplyErrorResolvers<ContextType>;
  DeleteHighlightReplyResult?: DeleteHighlightReplyResultResolvers<ContextType>;
  DeleteHighlightReplySuccess?: DeleteHighlightReplySuccessResolvers<ContextType>;
  DeleteHighlightResult?: DeleteHighlightResultResolvers<ContextType>;
  DeleteHighlightSuccess?: DeleteHighlightSuccessResolvers<ContextType>;
  DeleteIntegrationError?: DeleteIntegrationErrorResolvers<ContextType>;
  DeleteIntegrationResult?: DeleteIntegrationResultResolvers<ContextType>;
  DeleteIntegrationSuccess?: DeleteIntegrationSuccessResolvers<ContextType>;
  DeleteLabelError?: DeleteLabelErrorResolvers<ContextType>;
  DeleteLabelResult?: DeleteLabelResultResolvers<ContextType>;
  DeleteLabelSuccess?: DeleteLabelSuccessResolvers<ContextType>;
  DeleteNewsletterEmailError?: DeleteNewsletterEmailErrorResolvers<ContextType>;
  DeleteNewsletterEmailResult?: DeleteNewsletterEmailResultResolvers<ContextType>;
  DeleteNewsletterEmailSuccess?: DeleteNewsletterEmailSuccessResolvers<ContextType>;
  DeletePostError?: DeletePostErrorResolvers<ContextType>;
  DeletePostResult?: DeletePostResultResolvers<ContextType>;
  DeletePostSuccess?: DeletePostSuccessResolvers<ContextType>;
  DeleteReactionError?: DeleteReactionErrorResolvers<ContextType>;
  DeleteReactionResult?: DeleteReactionResultResolvers<ContextType>;
  DeleteReactionSuccess?: DeleteReactionSuccessResolvers<ContextType>;
  DeleteReminderError?: DeleteReminderErrorResolvers<ContextType>;
  DeleteReminderResult?: DeleteReminderResultResolvers<ContextType>;
  DeleteReminderSuccess?: DeleteReminderSuccessResolvers<ContextType>;
  DeleteRuleError?: DeleteRuleErrorResolvers<ContextType>;
  DeleteRuleResult?: DeleteRuleResultResolvers<ContextType>;
  DeleteRuleSuccess?: DeleteRuleSuccessResolvers<ContextType>;
  DeleteWebhookError?: DeleteWebhookErrorResolvers<ContextType>;
  DeleteWebhookResult?: DeleteWebhookResultResolvers<ContextType>;
  DeleteWebhookSuccess?: DeleteWebhookSuccessResolvers<ContextType>;
  DeviceToken?: DeviceTokenResolvers<ContextType>;
  DeviceTokensError?: DeviceTokensErrorResolvers<ContextType>;
  DeviceTokensResult?: DeviceTokensResultResolvers<ContextType>;
  DeviceTokensSuccess?: DeviceTokensSuccessResolvers<ContextType>;
  DigestConfig?: DigestConfigResolvers<ContextType>;
  DiscoverFeed?: DiscoverFeedResolvers<ContextType>;
  DiscoverFeedArticle?: DiscoverFeedArticleResolvers<ContextType>;
  DiscoverFeedError?: DiscoverFeedErrorResolvers<ContextType>;
  DiscoverFeedResult?: DiscoverFeedResultResolvers<ContextType>;
  DiscoverFeedSuccess?: DiscoverFeedSuccessResolvers<ContextType>;
  DiscoverTopic?: DiscoverTopicResolvers<ContextType>;
  EditDiscoverFeedError?: EditDiscoverFeedErrorResolvers<ContextType>;
  EditDiscoverFeedResult?: EditDiscoverFeedResultResolvers<ContextType>;
  EditDiscoverFeedSuccess?: EditDiscoverFeedSuccessResolvers<ContextType>;
  EmptyTrashError?: EmptyTrashErrorResolvers<ContextType>;
  EmptyTrashResult?: EmptyTrashResultResolvers<ContextType>;
  EmptyTrashSuccess?: EmptyTrashSuccessResolvers<ContextType>;
  ExportToIntegrationError?: ExportToIntegrationErrorResolvers<ContextType>;
  ExportToIntegrationResult?: ExportToIntegrationResultResolvers<ContextType>;
  ExportToIntegrationSuccess?: ExportToIntegrationSuccessResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  Feed?: FeedResolvers<ContextType>;
  FeedArticle?: FeedArticleResolvers<ContextType>;
  FeedArticleEdge?: FeedArticleEdgeResolvers<ContextType>;
  FeedArticlesError?: FeedArticlesErrorResolvers<ContextType>;
  FeedArticlesResult?: FeedArticlesResultResolvers<ContextType>;
  FeedArticlesSuccess?: FeedArticlesSuccessResolvers<ContextType>;
  FeedEdge?: FeedEdgeResolvers<ContextType>;
  FeedsError?: FeedsErrorResolvers<ContextType>;
  FeedsResult?: FeedsResultResolvers<ContextType>;
  FeedsSuccess?: FeedsSuccessResolvers<ContextType>;
  FetchContentError?: FetchContentErrorResolvers<ContextType>;
  FetchContentResult?: FetchContentResultResolvers<ContextType>;
  FetchContentSuccess?: FetchContentSuccessResolvers<ContextType>;
  Filter?: FilterResolvers<ContextType>;
  FiltersError?: FiltersErrorResolvers<ContextType>;
  FiltersResult?: FiltersResultResolvers<ContextType>;
  FiltersSuccess?: FiltersSuccessResolvers<ContextType>;
  FolderPoliciesError?: FolderPoliciesErrorResolvers<ContextType>;
  FolderPoliciesResult?: FolderPoliciesResultResolvers<ContextType>;
  FolderPoliciesSuccess?: FolderPoliciesSuccessResolvers<ContextType>;
  FolderPolicy?: FolderPolicyResolvers<ContextType>;
  GenerateAnkiCardsBatchError?: GenerateAnkiCardsBatchErrorResolvers<ContextType>;
  GenerateAnkiCardsBatchResult?: GenerateAnkiCardsBatchResultResolvers<ContextType>;
  GenerateAnkiCardsBatchSuccess?: GenerateAnkiCardsBatchSuccessResolvers<ContextType>;
  GenerateAnkiCardsError?: GenerateAnkiCardsErrorResolvers<ContextType>;
  GenerateAnkiCardsResult?: GenerateAnkiCardsResultResolvers<ContextType>;
  GenerateAnkiCardsSuccess?: GenerateAnkiCardsSuccessResolvers<ContextType>;
  GenerateApiKeyError?: GenerateApiKeyErrorResolvers<ContextType>;
  GenerateApiKeyResult?: GenerateApiKeyResultResolvers<ContextType>;
  GenerateApiKeySuccess?: GenerateApiKeySuccessResolvers<ContextType>;
  GetDiscoverFeedArticleError?: GetDiscoverFeedArticleErrorResolvers<ContextType>;
  GetDiscoverFeedArticleResults?: GetDiscoverFeedArticleResultsResolvers<ContextType>;
  GetDiscoverFeedArticleSuccess?: GetDiscoverFeedArticleSuccessResolvers<ContextType>;
  GetDiscoverTopicError?: GetDiscoverTopicErrorResolvers<ContextType>;
  GetDiscoverTopicResults?: GetDiscoverTopicResultsResolvers<ContextType>;
  GetDiscoverTopicSuccess?: GetDiscoverTopicSuccessResolvers<ContextType>;
  GetFollowersError?: GetFollowersErrorResolvers<ContextType>;
  GetFollowersResult?: GetFollowersResultResolvers<ContextType>;
  GetFollowersSuccess?: GetFollowersSuccessResolvers<ContextType>;
  GetFollowingError?: GetFollowingErrorResolvers<ContextType>;
  GetFollowingResult?: GetFollowingResultResolvers<ContextType>;
  GetFollowingSuccess?: GetFollowingSuccessResolvers<ContextType>;
  GetUserPersonalizationError?: GetUserPersonalizationErrorResolvers<ContextType>;
  GetUserPersonalizationResult?: GetUserPersonalizationResultResolvers<ContextType>;
  GetUserPersonalizationSuccess?: GetUserPersonalizationSuccessResolvers<ContextType>;
  GoogleSignupError?: GoogleSignupErrorResolvers<ContextType>;
  GoogleSignupResult?: GoogleSignupResultResolvers<ContextType>;
  GoogleSignupSuccess?: GoogleSignupSuccessResolvers<ContextType>;
  GroupsError?: GroupsErrorResolvers<ContextType>;
  GroupsResult?: GroupsResultResolvers<ContextType>;
  GroupsSuccess?: GroupsSuccessResolvers<ContextType>;
  HiddenHomeSectionError?: HiddenHomeSectionErrorResolvers<ContextType>;
  HiddenHomeSectionResult?: HiddenHomeSectionResultResolvers<ContextType>;
  HiddenHomeSectionSuccess?: HiddenHomeSectionSuccessResolvers<ContextType>;
  Highlight?: HighlightResolvers<ContextType>;
  HighlightEdge?: HighlightEdgeResolvers<ContextType>;
  HighlightReply?: HighlightReplyResolvers<ContextType>;
  HighlightStats?: HighlightStatsResolvers<ContextType>;
  HighlightsError?: HighlightsErrorResolvers<ContextType>;
  HighlightsResult?: HighlightsResultResolvers<ContextType>;
  HighlightsSuccess?: HighlightsSuccessResolvers<ContextType>;
  HomeEdge?: HomeEdgeResolvers<ContextType>;
  HomeError?: HomeErrorResolvers<ContextType>;
  HomeItem?: HomeItemResolvers<ContextType>;
  HomeItemSource?: HomeItemSourceResolvers<ContextType>;
  HomeResult?: HomeResultResolvers<ContextType>;
  HomeSection?: HomeSectionResolvers<ContextType>;
  HomeSuccess?: HomeSuccessResolvers<ContextType>;
  ImportFromIntegrationError?: ImportFromIntegrationErrorResolvers<ContextType>;
  ImportFromIntegrationResult?: ImportFromIntegrationResultResolvers<ContextType>;
  ImportFromIntegrationSuccess?: ImportFromIntegrationSuccessResolvers<ContextType>;
  Integration?: IntegrationResolvers<ContextType>;
  IntegrationError?: IntegrationErrorResolvers<ContextType>;
  IntegrationResult?: IntegrationResultResolvers<ContextType>;
  IntegrationSuccess?: IntegrationSuccessResolvers<ContextType>;
  IntegrationsError?: IntegrationsErrorResolvers<ContextType>;
  IntegrationsResult?: IntegrationsResultResolvers<ContextType>;
  IntegrationsSuccess?: IntegrationsSuccessResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JoinGroupError?: JoinGroupErrorResolvers<ContextType>;
  JoinGroupResult?: JoinGroupResultResolvers<ContextType>;
  JoinGroupSuccess?: JoinGroupSuccessResolvers<ContextType>;
  Label?: LabelResolvers<ContextType>;
  LabelsError?: LabelsErrorResolvers<ContextType>;
  LabelsResult?: LabelsResultResolvers<ContextType>;
  LabelsSuccess?: LabelsSuccessResolvers<ContextType>;
  LeaveGroupError?: LeaveGroupErrorResolvers<ContextType>;
  LeaveGroupResult?: LeaveGroupResultResolvers<ContextType>;
  LeaveGroupSuccess?: LeaveGroupSuccessResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  LinkShareInfo?: LinkShareInfoResolvers<ContextType>;
  LogOutError?: LogOutErrorResolvers<ContextType>;
  LogOutResult?: LogOutResultResolvers<ContextType>;
  LogOutSuccess?: LogOutSuccessResolvers<ContextType>;
  LoginError?: LoginErrorResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LoginSuccess?: LoginSuccessResolvers<ContextType>;
  MarkEmailAsItemError?: MarkEmailAsItemErrorResolvers<ContextType>;
  MarkEmailAsItemResult?: MarkEmailAsItemResultResolvers<ContextType>;
  MarkEmailAsItemSuccess?: MarkEmailAsItemSuccessResolvers<ContextType>;
  MergeHighlightError?: MergeHighlightErrorResolvers<ContextType>;
  MergeHighlightResult?: MergeHighlightResultResolvers<ContextType>;
  MergeHighlightSuccess?: MergeHighlightSuccessResolvers<ContextType>;
  MoveFilterError?: MoveFilterErrorResolvers<ContextType>;
  MoveFilterResult?: MoveFilterResultResolvers<ContextType>;
  MoveFilterSuccess?: MoveFilterSuccessResolvers<ContextType>;
  MoveLabelError?: MoveLabelErrorResolvers<ContextType>;
  MoveLabelResult?: MoveLabelResultResolvers<ContextType>;
  MoveLabelSuccess?: MoveLabelSuccessResolvers<ContextType>;
  MoveToFolderError?: MoveToFolderErrorResolvers<ContextType>;
  MoveToFolderResult?: MoveToFolderResultResolvers<ContextType>;
  MoveToFolderSuccess?: MoveToFolderSuccessResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewsletterEmail?: NewsletterEmailResolvers<ContextType>;
  NewsletterEmailsError?: NewsletterEmailsErrorResolvers<ContextType>;
  NewsletterEmailsResult?: NewsletterEmailsResultResolvers<ContextType>;
  NewsletterEmailsSuccess?: NewsletterEmailsSuccessResolvers<ContextType>;
  OptInFeatureError?: OptInFeatureErrorResolvers<ContextType>;
  OptInFeatureResult?: OptInFeatureResultResolvers<ContextType>;
  OptInFeatureSuccess?: OptInFeatureSuccessResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  PostError?: PostErrorResolvers<ContextType>;
  PostResult?: PostResultResolvers<ContextType>;
  PostSuccess?: PostSuccessResolvers<ContextType>;
  PostsError?: PostsErrorResolvers<ContextType>;
  PostsResult?: PostsResultResolvers<ContextType>;
  PostsSuccess?: PostsSuccessResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  ReadState?: ReadStateResolvers<ContextType>;
  RecentEmail?: RecentEmailResolvers<ContextType>;
  RecentEmailsError?: RecentEmailsErrorResolvers<ContextType>;
  RecentEmailsResult?: RecentEmailsResultResolvers<ContextType>;
  RecentEmailsSuccess?: RecentEmailsSuccessResolvers<ContextType>;
  RecentSearch?: RecentSearchResolvers<ContextType>;
  RecentSearchesError?: RecentSearchesErrorResolvers<ContextType>;
  RecentSearchesResult?: RecentSearchesResultResolvers<ContextType>;
  RecentSearchesSuccess?: RecentSearchesSuccessResolvers<ContextType>;
  RecommendError?: RecommendErrorResolvers<ContextType>;
  RecommendHighlightsError?: RecommendHighlightsErrorResolvers<ContextType>;
  RecommendHighlightsResult?: RecommendHighlightsResultResolvers<ContextType>;
  RecommendHighlightsSuccess?: RecommendHighlightsSuccessResolvers<ContextType>;
  RecommendResult?: RecommendResultResolvers<ContextType>;
  RecommendSuccess?: RecommendSuccessResolvers<ContextType>;
  Recommendation?: RecommendationResolvers<ContextType>;
  RecommendationGroup?: RecommendationGroupResolvers<ContextType>;
  RecommendingUser?: RecommendingUserResolvers<ContextType>;
  RefreshHomeError?: RefreshHomeErrorResolvers<ContextType>;
  RefreshHomeResult?: RefreshHomeResultResolvers<ContextType>;
  RefreshHomeSuccess?: RefreshHomeSuccessResolvers<ContextType>;
  RegenerateAnkiCardsError?: RegenerateAnkiCardsErrorResolvers<ContextType>;
  RegenerateAnkiCardsResult?: RegenerateAnkiCardsResultResolvers<ContextType>;
  RegenerateAnkiCardsSuccess?: RegenerateAnkiCardsSuccessResolvers<ContextType>;
  Reminder?: ReminderResolvers<ContextType>;
  ReminderError?: ReminderErrorResolvers<ContextType>;
  ReminderResult?: ReminderResultResolvers<ContextType>;
  ReminderSuccess?: ReminderSuccessResolvers<ContextType>;
  ReplyToEmailError?: ReplyToEmailErrorResolvers<ContextType>;
  ReplyToEmailResult?: ReplyToEmailResultResolvers<ContextType>;
  ReplyToEmailSuccess?: ReplyToEmailSuccessResolvers<ContextType>;
  ReportItemResult?: ReportItemResultResolvers<ContextType>;
  RevokeApiKeyError?: RevokeApiKeyErrorResolvers<ContextType>;
  RevokeApiKeyResult?: RevokeApiKeyResultResolvers<ContextType>;
  RevokeApiKeySuccess?: RevokeApiKeySuccessResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleAction?: RuleActionResolvers<ContextType>;
  RulesError?: RulesErrorResolvers<ContextType>;
  RulesResult?: RulesResultResolvers<ContextType>;
  RulesSuccess?: RulesSuccessResolvers<ContextType>;
  SaveArticleReadingProgressError?: SaveArticleReadingProgressErrorResolvers<ContextType>;
  SaveArticleReadingProgressResult?: SaveArticleReadingProgressResultResolvers<ContextType>;
  SaveArticleReadingProgressSuccess?: SaveArticleReadingProgressSuccessResolvers<ContextType>;
  SaveDiscoverArticleError?: SaveDiscoverArticleErrorResolvers<ContextType>;
  SaveDiscoverArticleResult?: SaveDiscoverArticleResultResolvers<ContextType>;
  SaveDiscoverArticleSuccess?: SaveDiscoverArticleSuccessResolvers<ContextType>;
  SaveError?: SaveErrorResolvers<ContextType>;
  SaveFilterError?: SaveFilterErrorResolvers<ContextType>;
  SaveFilterResult?: SaveFilterResultResolvers<ContextType>;
  SaveFilterSuccess?: SaveFilterSuccessResolvers<ContextType>;
  SaveResult?: SaveResultResolvers<ContextType>;
  SaveSuccess?: SaveSuccessResolvers<ContextType>;
  ScanFeedsError?: ScanFeedsErrorResolvers<ContextType>;
  ScanFeedsResult?: ScanFeedsResultResolvers<ContextType>;
  ScanFeedsSuccess?: ScanFeedsSuccessResolvers<ContextType>;
  SearchError?: SearchErrorResolvers<ContextType>;
  SearchItem?: SearchItemResolvers<ContextType>;
  SearchItemEdge?: SearchItemEdgeResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  SearchSuccess?: SearchSuccessResolvers<ContextType>;
  SendInstallInstructionsError?: SendInstallInstructionsErrorResolvers<ContextType>;
  SendInstallInstructionsResult?: SendInstallInstructionsResultResolvers<ContextType>;
  SendInstallInstructionsSuccess?: SendInstallInstructionsSuccessResolvers<ContextType>;
  SetBookmarkArticleError?: SetBookmarkArticleErrorResolvers<ContextType>;
  SetBookmarkArticleResult?: SetBookmarkArticleResultResolvers<ContextType>;
  SetBookmarkArticleSuccess?: SetBookmarkArticleSuccessResolvers<ContextType>;
  SetDeviceTokenError?: SetDeviceTokenErrorResolvers<ContextType>;
  SetDeviceTokenResult?: SetDeviceTokenResultResolvers<ContextType>;
  SetDeviceTokenSuccess?: SetDeviceTokenSuccessResolvers<ContextType>;
  SetFavoriteArticleError?: SetFavoriteArticleErrorResolvers<ContextType>;
  SetFavoriteArticleResult?: SetFavoriteArticleResultResolvers<ContextType>;
  SetFavoriteArticleSuccess?: SetFavoriteArticleSuccessResolvers<ContextType>;
  SetFollowError?: SetFollowErrorResolvers<ContextType>;
  SetFollowResult?: SetFollowResultResolvers<ContextType>;
  SetFollowSuccess?: SetFollowSuccessResolvers<ContextType>;
  SetIntegrationError?: SetIntegrationErrorResolvers<ContextType>;
  SetIntegrationResult?: SetIntegrationResultResolvers<ContextType>;
  SetIntegrationSuccess?: SetIntegrationSuccessResolvers<ContextType>;
  SetLabelsError?: SetLabelsErrorResolvers<ContextType>;
  SetLabelsResult?: SetLabelsResultResolvers<ContextType>;
  SetLabelsSuccess?: SetLabelsSuccessResolvers<ContextType>;
  SetRuleError?: SetRuleErrorResolvers<ContextType>;
  SetRuleResult?: SetRuleResultResolvers<ContextType>;
  SetRuleSuccess?: SetRuleSuccessResolvers<ContextType>;
  SetShareArticleError?: SetShareArticleErrorResolvers<ContextType>;
  SetShareArticleResult?: SetShareArticleResultResolvers<ContextType>;
  SetShareArticleSuccess?: SetShareArticleSuccessResolvers<ContextType>;
  SetShareHighlightError?: SetShareHighlightErrorResolvers<ContextType>;
  SetShareHighlightResult?: SetShareHighlightResultResolvers<ContextType>;
  SetShareHighlightSuccess?: SetShareHighlightSuccessResolvers<ContextType>;
  SetShowTranslatedError?: SetShowTranslatedErrorResolvers<ContextType>;
  SetShowTranslatedResult?: SetShowTranslatedResultResolvers<ContextType>;
  SetShowTranslatedSuccess?: SetShowTranslatedSuccessResolvers<ContextType>;
  SetUserPersonalizationError?: SetUserPersonalizationErrorResolvers<ContextType>;
  SetUserPersonalizationResult?: SetUserPersonalizationResultResolvers<ContextType>;
  SetUserPersonalizationSuccess?: SetUserPersonalizationSuccessResolvers<ContextType>;
  SetWebhookError?: SetWebhookErrorResolvers<ContextType>;
  SetWebhookResult?: SetWebhookResultResolvers<ContextType>;
  SetWebhookSuccess?: SetWebhookSuccessResolvers<ContextType>;
  ShareStats?: ShareStatsResolvers<ContextType>;
  SharedArticleError?: SharedArticleErrorResolvers<ContextType>;
  SharedArticleResult?: SharedArticleResultResolvers<ContextType>;
  SharedArticleSuccess?: SharedArticleSuccessResolvers<ContextType>;
  SubscribeError?: SubscribeErrorResolvers<ContextType>;
  SubscribeResult?: SubscribeResultResolvers<ContextType>;
  SubscribeSuccess?: SubscribeSuccessResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubscriptionError?: SubscriptionErrorResolvers<ContextType>;
  SubscriptionResult?: SubscriptionResultResolvers<ContextType>;
  SubscriptionRootType?: SubscriptionRootTypeResolvers<ContextType>;
  SubscriptionSuccess?: SubscriptionSuccessResolvers<ContextType>;
  SubscriptionsError?: SubscriptionsErrorResolvers<ContextType>;
  SubscriptionsResult?: SubscriptionsResultResolvers<ContextType>;
  SubscriptionsSuccess?: SubscriptionsSuccessResolvers<ContextType>;
  SyncUpdatedItemEdge?: SyncUpdatedItemEdgeResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TestAnkiConnectionError?: TestAnkiConnectionErrorResolvers<ContextType>;
  TestAnkiConnectionResult?: TestAnkiConnectionResultResolvers<ContextType>;
  TestAnkiConnectionSuccess?: TestAnkiConnectionSuccessResolvers<ContextType>;
  TypeaheadSearchError?: TypeaheadSearchErrorResolvers<ContextType>;
  TypeaheadSearchItem?: TypeaheadSearchItemResolvers<ContextType>;
  TypeaheadSearchResult?: TypeaheadSearchResultResolvers<ContextType>;
  TypeaheadSearchSuccess?: TypeaheadSearchSuccessResolvers<ContextType>;
  UnsubscribeError?: UnsubscribeErrorResolvers<ContextType>;
  UnsubscribeResult?: UnsubscribeResultResolvers<ContextType>;
  UnsubscribeSuccess?: UnsubscribeSuccessResolvers<ContextType>;
  UpdateEmailError?: UpdateEmailErrorResolvers<ContextType>;
  UpdateEmailResult?: UpdateEmailResultResolvers<ContextType>;
  UpdateEmailSuccess?: UpdateEmailSuccessResolvers<ContextType>;
  UpdateFilterError?: UpdateFilterErrorResolvers<ContextType>;
  UpdateFilterResult?: UpdateFilterResultResolvers<ContextType>;
  UpdateFilterSuccess?: UpdateFilterSuccessResolvers<ContextType>;
  UpdateFolderPolicyError?: UpdateFolderPolicyErrorResolvers<ContextType>;
  UpdateFolderPolicyResult?: UpdateFolderPolicyResultResolvers<ContextType>;
  UpdateFolderPolicySuccess?: UpdateFolderPolicySuccessResolvers<ContextType>;
  UpdateHighlightError?: UpdateHighlightErrorResolvers<ContextType>;
  UpdateHighlightReplyError?: UpdateHighlightReplyErrorResolvers<ContextType>;
  UpdateHighlightReplyResult?: UpdateHighlightReplyResultResolvers<ContextType>;
  UpdateHighlightReplySuccess?: UpdateHighlightReplySuccessResolvers<ContextType>;
  UpdateHighlightResult?: UpdateHighlightResultResolvers<ContextType>;
  UpdateHighlightSuccess?: UpdateHighlightSuccessResolvers<ContextType>;
  UpdateLabelError?: UpdateLabelErrorResolvers<ContextType>;
  UpdateLabelResult?: UpdateLabelResultResolvers<ContextType>;
  UpdateLabelSuccess?: UpdateLabelSuccessResolvers<ContextType>;
  UpdateLinkShareInfoError?: UpdateLinkShareInfoErrorResolvers<ContextType>;
  UpdateLinkShareInfoResult?: UpdateLinkShareInfoResultResolvers<ContextType>;
  UpdateLinkShareInfoSuccess?: UpdateLinkShareInfoSuccessResolvers<ContextType>;
  UpdateNewsletterEmailError?: UpdateNewsletterEmailErrorResolvers<ContextType>;
  UpdateNewsletterEmailResult?: UpdateNewsletterEmailResultResolvers<ContextType>;
  UpdateNewsletterEmailSuccess?: UpdateNewsletterEmailSuccessResolvers<ContextType>;
  UpdatePageError?: UpdatePageErrorResolvers<ContextType>;
  UpdatePageResult?: UpdatePageResultResolvers<ContextType>;
  UpdatePageSuccess?: UpdatePageSuccessResolvers<ContextType>;
  UpdatePostError?: UpdatePostErrorResolvers<ContextType>;
  UpdatePostResult?: UpdatePostResultResolvers<ContextType>;
  UpdatePostSuccess?: UpdatePostSuccessResolvers<ContextType>;
  UpdateReminderError?: UpdateReminderErrorResolvers<ContextType>;
  UpdateReminderResult?: UpdateReminderResultResolvers<ContextType>;
  UpdateReminderSuccess?: UpdateReminderSuccessResolvers<ContextType>;
  UpdateSharedCommentError?: UpdateSharedCommentErrorResolvers<ContextType>;
  UpdateSharedCommentResult?: UpdateSharedCommentResultResolvers<ContextType>;
  UpdateSharedCommentSuccess?: UpdateSharedCommentSuccessResolvers<ContextType>;
  UpdateSubscriptionError?: UpdateSubscriptionErrorResolvers<ContextType>;
  UpdateSubscriptionResult?: UpdateSubscriptionResultResolvers<ContextType>;
  UpdateSubscriptionSuccess?: UpdateSubscriptionSuccessResolvers<ContextType>;
  UpdateUserError?: UpdateUserErrorResolvers<ContextType>;
  UpdateUserProfileError?: UpdateUserProfileErrorResolvers<ContextType>;
  UpdateUserProfileResult?: UpdateUserProfileResultResolvers<ContextType>;
  UpdateUserProfileSuccess?: UpdateUserProfileSuccessResolvers<ContextType>;
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>;
  UpdateUserSuccess?: UpdateUserSuccessResolvers<ContextType>;
  UpdatesSinceError?: UpdatesSinceErrorResolvers<ContextType>;
  UpdatesSinceResult?: UpdatesSinceResultResolvers<ContextType>;
  UpdatesSinceSuccess?: UpdatesSinceSuccessResolvers<ContextType>;
  UploadFileRequestError?: UploadFileRequestErrorResolvers<ContextType>;
  UploadFileRequestResult?: UploadFileRequestResultResolvers<ContextType>;
  UploadFileRequestSuccess?: UploadFileRequestSuccessResolvers<ContextType>;
  UploadImportFileError?: UploadImportFileErrorResolvers<ContextType>;
  UploadImportFileResult?: UploadImportFileResultResolvers<ContextType>;
  UploadImportFileSuccess?: UploadImportFileSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserPersonalization?: UserPersonalizationResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserSuccess?: UserSuccessResolvers<ContextType>;
  UsersError?: UsersErrorResolvers<ContextType>;
  UsersResult?: UsersResultResolvers<ContextType>;
  UsersSuccess?: UsersSuccessResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
  WebhookError?: WebhookErrorResolvers<ContextType>;
  WebhookResult?: WebhookResultResolvers<ContextType>;
  WebhookSuccess?: WebhookSuccessResolvers<ContextType>;
  WebhooksError?: WebhooksErrorResolvers<ContextType>;
  WebhooksResult?: WebhooksResultResolvers<ContextType>;
  WebhooksSuccess?: WebhooksSuccessResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = ResolverContext> = {
  sanitize?: SanitizeDirectiveResolver<any, any, ContextType>;
};
