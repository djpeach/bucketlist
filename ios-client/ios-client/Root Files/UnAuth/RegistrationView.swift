//
//  RegistrationView.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class RegistrationView: UIView {
    var delegate: UnAuthDelegate?
    
    let showLoginBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.backgroundColor = .white
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        btn.setTitle("Login instead", for: .normal)
        btn.addTarget(self, action: #selector(showLogin), for: .touchUpInside)
        btn.translatesAutoresizingMaskIntoConstraints = false
        return btn
    }()
    
    @objc private func showLogin() {
        delegate?.showLogin()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .purple
        
        addSubview(showLoginBtn)
        
        NSLayoutConstraint.activate([
            showLoginBtn.centerXAnchor.constraint(equalTo: centerXAnchor),
            showLoginBtn.centerYAnchor.constraint(equalTo: centerYAnchor),
            showLoginBtn.heightAnchor.constraint(equalToConstant: 40),
            showLoginBtn.widthAnchor.constraint(equalToConstant: 200)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
