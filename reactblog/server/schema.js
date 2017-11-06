var mongoose = require('mongoose')
var Schema = mongoose.Schema
var graphql = require('graphql')
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLBoolean = graphql.GraphQLBoolean
var GraphQLID = graphql.GraphQLID
var GraphQLString = graphql.GraphQLString
var GraphQLList = graphql.GraphQLList
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLSchema = graphql.GraphQLSchema

var POST = mongoose.model('Post', new Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: String,
    title: String,
    content: String
  }))

  var COMPOSE_URI_DEFAULT = 'mongodb://localhost/blogDatabase'
  mongoose.connect(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT, function (error) {
    if (error) console.error(error)
    else console.log('mongo connected')
  })

  var PostType = new GraphQLObjectType({
    name: 'posts',
    fields: () => ({
      id: {
        type: GraphQLID,
        description: 'Post id'
      },
      author: {
        type: GraphQLString,
        description: 'Author Name'
      },
      title: {
        type: GraphQLString,
        description: 'Post Title'
      },
      content: {
        type: GraphQLString,
        description: 'Content'
      }
    })
  })

  var promiseListAll = () => {
    return new Promise((resolve, reject) => {
      POST.find((err, posts) => {
        if (err) reject(err)
        else resolve(posts)
      })
    })
  }
  
 var QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      posts: {
        type: new GraphQLList(PostType),
        resolve: () => {
          return promiseListAll()
        }
      }
    })
  })

  var MutationAdd = {
    type: PostType,
    description: 'Add a Post',
    args: {
      author: {
        name: 'Author Name',
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        name: 'Post title',
        type: new GraphQLNonNull(GraphQLString)
      },
      content: {
        name: 'Content',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      var newPost = new POST({
        author: args.author,
        title: args.title,
        content: args.content
      })

      newPost.id = newPost._id
      return new Promise((resolve, reject) => {
        newPost.save(function (err) {
          if (err) reject(err)
          else resolve(newPost)
        })
      })
    }
  }

  var MutationDelete = {
    type: PostType,
    description: 'Delete the post',
    args: {
      id: {
        name: 'Post Id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      return new Promise((resolve, reject) => {
        POST.findById(args.id, (err, post) => {
          if (err) {
            reject(err)
          } else if (!post) {
            reject('Post NOT found')
          } else {
            post.remove((err) => {
              if (err) reject(err)
              else resolve(post)
            })
          }
        })
      })
    }
  }

  var MutationEdit = {
    type: PostType,
    description: 'Edit a Post',
    args: {
      id: {
        name: 'Post Id',
        type: new GraphQLNonNull(GraphQLString)
      },
      author: {
        name: 'Author Name',
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        name: 'Post title',
        type: new GraphQLNonNull(GraphQLString)
      },
      content: {
        name: 'Content',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      return new Promise((resolve, reject) => {
        POST.findById(args.id, (err, post) => {
          if (err) {
            reject(err)
            return
          }
  
          if (!post) {
            reject('Post NOT found')
            return
          }
  
          post.author = args.author
          post.title = args.title
          post.content = args.content
          post.save((err) => {
            if (err) reject(err)
            else resolve(todo)
          })
        })
      })
    }
  }

  var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      add: MutationAdd,
      delete: MutationDelete,
      edit: MutationEdit
    }
  })

  module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  })
  