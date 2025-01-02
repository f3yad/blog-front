import axios from 'axios';
// const url = "http://localhost:3000";
const url = "https://blogStajBackend.vercel.app";

// ================== AUTH ==================
// ================== AUTH ==================
export async function login(username, password) {
  try {
    const body = { username, password };
    const response = await axios.post(`${url}/users/login`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== AUTH ==================
// ================== AUTH ==================





// ================== CATEGORY ==================
// ================== CATEGORY ==================
export async function createCategory(token, name, slug) {
  try {
    const body = { name, slug };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/categories`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllCategories() {
  try {
    const response = await axios.get(`${url}/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateCategory(token, categoryId, name, slug) {
  try {
    const body = { name, slug};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/categories/${categoryId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteCategory(token, categoryId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/categories/${categoryId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== CATEGORY ==================
// ================== CATEGORY ==================



// ================== USER ==================
// ================== USER ==================
export async function createUser(token, name, username, password, isAdmin) {
  try {
    const body = { name, username, password, isAdmin };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/users`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllUsers(token) {
  try {
    const options = { headers: { token, } }
    const response = await axios.get(`${url}/users`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllAuthors() {
  try {
    const response = await axios.get(`${url}/users/authors`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateUser(token, userId, name, password, isAdmin) {
  try {
    const body = { name, password, isAdmin};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/users/${userId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteUser(token, userId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/users/${userId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== USER ==================
// ================== USER ==================




// ================== POST ==================
// ================== POST ==================
export async function createPost(token, title, text, image, slug, isPublic, category) {
  try {
    const body = new FormData();
    body.append('title', title);
    body.append('text', text);
    body.append('image', image);
    body.append('slug', slug);
    body.append('isPublic', isPublic);
    body.append('category', category);

    const options = { headers: { token, } }
    const response = await axios.post(`${url}/posts`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllPosts() {
  try {
    const response = await axios.get(`${url}/posts`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updatePost(token, postId, title, text, image, slug, isPublic, category) {
  try {
    const body = new FormData();
    body.append('title', title);
    body.append('text', text);
    body.append('image', image);
    body.append('slug', slug);
    body.append('isPublic', isPublic);
    body.append('category', category);

    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/posts/${postId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deletePost(token, postId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/posts/${postId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllPublicPosts() {
  try {
    const response = await axios.get(`${url}/posts/public`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllPublicPostsByCategorySlug(categorySlug) {
  try {
    const response = await axios.get(`${url}/posts/public/category/${categorySlug}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllPublicPostsByUsername(username) {
  try {
    const response = await axios.get(`${url}/posts/public/user/${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPostBySlug(postSlug) {
  try {
    const response = await axios.get(`${url}/posts/public/post/${postSlug}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ================== POST ==================
// ================== POST ==================


// export async function updateCategories(categoryId, name, slug) {
//   try {
//     const formData = new FormData();
//     formData.append("ad", ad);
//     formData.append("soyad", soyad);
//     formData.append("sifre", sifre);
//     formData.append("resim", resim);

//     const response = await axios.patch(`${url}/kullanici`, formData, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function giris(kullaniciadi, sifre) {
//   try {
//     const response = await axios.post(`${url}/kullanici/giris`, {
//       kullaniciadi,
//       sifre,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function kullaniciProfilGetir(kullaniciadi) {
//   try {
//     const response = await axios.get(`${url}/kullanici/profil/${kullaniciadi}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function urunEkle(token, ad, kategori, fiyat, aciklama, marka, durum, renk, materyal, il, ilce, resim ) {
//   try {
//     const formData = new FormData();
//     formData.append("ad", ad);
//     formData.append("kategori", kategori);
//     formData.append("fiyat", fiyat);
//     formData.append("aciklama", aciklama);
//     formData.append("marka", marka);
//     formData.append("durum", durum);
//     if (renk) formData.append("renk", renk);
//     if (materyal) formData.append("materyal", materyal);
//     formData.append("il", il);
//     formData.append("ilce", ilce);
//     formData.append("resim", resim);

//     const response = await axios.post(`${url}/urun`, formData, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function urunGetir(urunId) {
//   try {
//     const response = await axios.get(`${url}/urun/${urunId}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function urunGuncelle(token, id, ad, kategori, fiyat, aciklama, marka, durum, renk, materyal, il, ilce, resim ) {
//   try {
//     const formData = new FormData();
//     formData.append("ad", ad);
//     formData.append("kategori", kategori);
//     formData.append("fiyat", fiyat);
//     formData.append("aciklama", aciklama);
//     formData.append("marka", marka);
//     formData.append("durum", durum);
//     if (renk) formData.append("renk", renk);
//     if (materyal) formData.append("materyal", materyal);
//     formData.append("il", il);
//     formData.append("ilce", ilce);
//     formData.append("resim", resim);

//     const response = await axios.patch(`${url}/urun/${id}`, formData, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function urunSil(token, urunId) {
//   try {
//     const response = await axios.delete(`${url}/urun/${urunId}`,{
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function yorumYaz(token, metin, urunId) {
//   try {
//     const response = await axios.post(`${url}/yorum`, {
//       metin,
//       urunId,
//     }, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export async function yorumSil(token, id) {
//   try {
//     const response = await axios.delete(`${url}/yorum/${id}`, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function cevapYaz(token, metin, yorumId) {
//   try {
//     const response = await axios.post(`${url}/yorum/cevap`, {
//       metin,
//       yorumId,
//     }, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export async function cevapSil(token, id) {
//   try {
//     const response = await axios.delete(`${url}/yorum/cevap/${id}`, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function odemeUrlGetir(token, urun) {
//   try {
//     const response = await axios.post(`${url}/odeme/session`, {
//       urun,
//     }, {
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export async function faturaGetir(token, odemeId) {
//   try {
//     const response = await axios.get(`${url}/odeme/fatura/${odemeId}`,{
//       headers: {
//         token,
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function tumUrunleriGetir() {
//   try {
//     const response = await axios.get(`${url}/urun`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }