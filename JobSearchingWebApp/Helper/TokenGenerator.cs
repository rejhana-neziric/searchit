using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace JobSearchingWebApp.Helper
{
    public class TokenGenerator
    {
        //private readonly AppSettings _appSettings;

        //public TokenGenerator(IOptions<AppSettings> appSettings)
        //{
        //    _appSettings = appSettings.Value;
        //}

        //private async Task<string> generateJwtToken(Korisnik user)
        //{
        //    //Generate token that is valid for 7 days
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var token = await Task.Run(() =>
        //    {

        //        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        //            Expires = DateTime.UtcNow.AddDays(7),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //        };
        //        return tokenHandler.CreateToken(tokenDescriptor);
        //    });

        //    return tokenHandler.WriteToken(token);
        //}

        //public static string Generisi(int size)
        //{
        //    // Characters except I, l, O, 1, and 0 to decrease confusion when hand typing tokens
        //    var charSet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        //    var chars = charSet.ToCharArray();
        //    var data = new byte[1];
        //    #pragma warning disable SYSLIB0023 // Type or member is obsolete
        //    var crypto = new RNGCryptoServiceProvider();
        //    #pragma warning restore SYSLIB0023 // Type or member is obsolete
        //    crypto.GetNonZeroBytes(data);
        //    data = new byte[size];
        //    crypto.GetNonZeroBytes(data);
        //    var result = new StringBuilder(size);

        //    foreach (var b in data)
        //        result.Append(chars[b % (chars.Length)]);

        //    return result.ToString();
        //}

        //public static string GenerisiIme(int size)
        //{
        //    // Characters except I, l, O, 1, and 0 to decrease confusion when hand typing tokens
        //    var charSet = "ABCDEFGHJKLMNPQRSTUVWXYZ".ToLower();
        //    var chars = charSet.ToCharArray();
        //    var data = new byte[1];
        //    #pragma warning disable SYSLIB0023 // Type or member is obsolete
        //    var crypto = new RNGCryptoServiceProvider();
        //    #pragma warning restore SYSLIB0023 // Type or member is obsolete
        //    crypto.GetNonZeroBytes(data);
        //    data = new byte[size];
        //    crypto.GetNonZeroBytes(data);
        //    var result = new StringBuilder(size);

        //    foreach (var b in data)
        //        result.Append(chars[b % (chars.Length)]);

        //    var s = result.ToString();
        //    return "S" + result;
        //}
    }
}
